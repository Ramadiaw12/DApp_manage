// ==================== CONFIGURATION ====================
// À remplacer par vos vraies valeurs après déploiement
const CONTRACT_ADDRESS = "0xVotreAdresseDeployee";   // <-- À modifier
const CONTRACT_ABI = [ /* Copiez l'ABI depuis build/contracts/Annonces.json */ ];

// Éléments DOM
const btnAjouter = document.getElementById('btnAjouter');
const btnConsulter = document.getElementById('btnConsulter');
const btnRefreshTotal = document.getElementById('btnRefreshTotal');
const annonceMessage = document.getElementById('annonceMessage');
const rechercheId = document.getElementById('rechercheId');
const resultatDiv = document.getElementById('resultatConsultation');
const totalSpan = document.getElementById('totalAnnonces');
const networkStatusSpan = document.getElementById('networkStatus');

// Variables globales
let web3;
let contract;
let userAccount = null;

// ==================== UTILITAIRES ====================
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = isError ? '#b91c1c' : '#1e293b';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Met à jour l'affichage du total
async function updateTotal() {
    if (!contract) return;
    try {
        const total = await contract.methods.getNombreAnnonces().call();
        totalSpan.innerText = total.toString();
    } catch (err) {
        console.error("Erreur total", err);
        totalSpan.innerText = "?";
        showToast("Impossible de récupérer le nombre d'annonces", true);
    }
}

// Rafraîchit l'état de connexion MetaMask
async function initWeb3() {
    if (!window.ethereum) {
        networkStatusSpan.innerHTML = "❌ MetaMask non détecté";
        showToast("Installez MetaMask pour utiliser cette DApp", true);
        return false;
    }

    try {
        // Demander l'accès au compte
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        userAccount = accounts[0];
        networkStatusSpan.innerHTML = `✅ Connecté : ${userAccount.slice(0,6)}...${userAccount.slice(-4)}`;
        
        // Initialiser le contrat
        contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        // Mettre à jour le total immédiatement
        await updateTotal();
        
        // Écouter les changements de compte MetaMask
        window.ethereum.on('accountsChanged', async (newAccounts) => {
            if (newAccounts.length > 0) {
                userAccount = newAccounts[0];
                networkStatusSpan.innerHTML = `✅ Connecté : ${userAccount.slice(0,6)}...${userAccount.slice(-4)}`;
                showToast("Compte changé");
                await updateTotal();
            } else {
                userAccount = null;
                networkStatusSpan.innerHTML = "🔌 Aucun compte connecté";
                showToast("Veuillez connecter un compte MetaMask", true);
            }
        });
        
        return true;
    } catch (error) {
        console.error(error);
        networkStatusSpan.innerHTML = "⚠️ Accès refusé ou erreur";
        showToast("Erreur de connexion à MetaMask", true);
        return false;
    }
}

// ==================== FONCTIONS MÉTIER ====================
async function ajouterAnnonce(message) {
    if (!message.trim()) {
        showToast("Le message ne peut pas être vide", true);
        return false;
    }
    if (!contract || !userAccount) {
        showToast("Vérifiez votre connexion MetaMask", true);
        return false;
    }

    try {
        btnAjouter.disabled = true;
        btnAjouter.textContent = "⏳ Envoi en cours...";
        
        // Estimation du gas (optionnel mais pro)
        const gasEstimate = await contract.methods.ajouterAnnonce(message).estimateGas({ from: userAccount });
        
        const receipt = await contract.methods.ajouterAnnonce(message).send({
            from: userAccount,
            gas: Math.floor(gasEstimate * 1.1) // marge de sécurité
        });
        
        showToast(`✅ Annonce ajoutée ! Tx: ${receipt.transactionHash.slice(0,10)}...`);
        annonceMessage.value = "";
        await updateTotal(); // Rafraîchit le total après ajout
        return true;
    } catch (err) {
        console.error(err);
        let errorMsg = "Erreur lors de l'ajout";
        if (err.message.includes("User denied")) errorMsg = "Transaction refusée dans MetaMask";
        else if (err.message.includes("gas")) errorMsg = "Limite de gas dépassée";
        showToast(errorMsg, true);
        return false;
    } finally {
        btnAjouter.disabled = false;
        btnAjouter.textContent = "✨ Publier l'annonce";
    }
}

async function consulterAnnonce(id) {
    if (!id || id <= 0) {
        showToast("ID invalide (doit être ≥ 1)", true);
        return;
    }
    if (!contract) {
        showToast("Contrat non initialisé", true);
        return;
    }

    try {
        const annonce = await contract.methods.getAnnonce(id).call();
        // annonce = [id, message, emetteur, date]
        const dateObj = new Date(parseInt(annonce[3]) * 1000);
        const dateFormatted = dateObj.toLocaleString('fr-FR', { 
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' 
        });
        
        resultatDiv.innerHTML = `
            <div class="annonce-card">
                <p><span class="badge">ID ${annonce[0]}</span></p>
                <p><strong>📝 Message :</strong> ${escapeHtml(annonce[1])}</p>
                <p><strong>👤 Émetteur :</strong> ${annonce[2].slice(0,6)}...${annonce[2].slice(-4)}</p>
                <p><strong>📅 Création :</strong> ${dateFormatted}</p>
            </div>
        `;
        showToast(`Annonce #${id} chargée`);
    } catch (err) {
        console.error(err);
        resultatDiv.innerHTML = `<div class="annonce-card" style="background:#fee2e2; color:#991b1b;">❌ Aucune annonce trouvée avec l'ID ${id}</div>`;
        showToast("Annonce inexistante", true);
    }
}

// Petite sécurité anti-XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}

// ==================== ÉVÉNEMENTS ====================
btnAjouter.addEventListener('click', async () => {
    const message = annonceMessage.value;
    await ajouterAnnonce(message);
});

btnConsulter.addEventListener('click', async () => {
    const id = parseInt(rechercheId.value);
    await consulterAnnonce(id);
});

btnRefreshTotal.addEventListener('click', async () => {
    await updateTotal();
    showToast("Total actualisé");
});

// Détection du réseau et initialisation au chargement
window.addEventListener('load', async () => {
    await initWeb3();
    // Optionnel : écouter les changements de réseau MetaMask
    if (window.ethereum) {
        window.ethereum.on('chainChanged', () => window.location.reload());
    }
});