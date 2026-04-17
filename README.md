# 📢 DApp — Annonces de Classe

<p align="center">
  <img src="https://img.shields.io/badge/Solidity-0.8.x-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Truffle-5.x-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white"/>
  <img src="https://img.shields.io/badge/Web3.js-1.x-F16822?style=for-the-badge&logo=javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ganache-Local-FF4F00?style=for-the-badge&logo=ethereum&logoColor=white"/>
  <img src="https://img.shields.io/badge/MetaMask-Extension-E2761B?style=for-the-badge&logo=metamask&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

<p align="center">
  <em>Une application décentralisée (DApp) permettant de publier et consulter des annonces de classe sur la blockchain Ethereum — développée à des fins pédagogiques.</em>
</p>

---

## 📋 Table des matières

- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture du projet](#-architecture-du-projet)
- [Prérequis](#-prérequis)
- [Installation et exécution](#-installation-et-exécution)
- [Tests unitaires](#-tests-unitaires)
- [Utilisation de la DApp](#-utilisation-de-la-dapp)
- [Détails du smart contract](#-détails-du-smart-contract)
- [Dépannage](#-dépannage)
- [Liens utiles](#-liens-utiles)
- [Auteurs et remerciements](#-auteurs-et-remerciements)

---

## 📖 Description

**Annonces de Classe** est une application décentralisée (DApp) développée dans le cadre d'un apprentissage pratique de la blockchain Ethereum. Elle permet à des utilisateurs connectés via **MetaMask** de :

- **Publier** des annonces sur un réseau Ethereum local (Ganache)
- **Consulter** une annonce par son identifiant
- **Afficher** le nombre total d'annonces enregistrées

Chaque annonce est stockée de façon **immuable** sur la blockchain : son auteur (adresse Ethereum), son contenu (message) et son horodatage (timestamp) sont accessibles à tout moment et ne peuvent pas être modifiés après publication.

> **Note pédagogique :** Ce projet illustre le cycle complet de développement d'une DApp : écriture d'un smart contract en Solidity, déploiement via Truffle sur Ganache, interaction via Web3.js, et intégration d'un wallet MetaMask dans une interface web moderne.

---

## ✅ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| ✅ Ajout d'annonce | Publier un message sur la blockchain via MetaMask |
| ✅ Consultation par ID | Retrouver une annonce grâce à son identifiant unique |
| ✅ Comptage total | Afficher le nombre d'annonces publiées |
| ✅ Horodatage | Chaque annonce possède un timestamp Unix automatique |
| ✅ Traçabilité | L'adresse Ethereum de l'émetteur est enregistrée |
| ✅ Interface moderne | Design responsive avec cartes et animations CSS |
| ✅ Tests unitaires | Suite de tests Truffle/JavaScript couvrant les cas clés |

---

## 🗂️ Architecture du projet

```
annonces-dapp/
│
├── 📁 contracts/                  # Smart contracts Solidity
│   └── Annonces.sol               # Contrat principal : stockage et lecture des annonces
│
├── 📁 migrations/                 # Scripts de déploiement Truffle
│   ├── 1_initial_migration.js     # Migration de base (Migrations.sol)
│   └── 2_deploy_annonces.js       # Déploiement du contrat Annonces
│
├── 📁 test/                       # Tests unitaires JavaScript (Truffle)
│   └── annonces.test.js           # 3 cas de test : ajout, consultation vide, comptage
│
├── 📁 build/                      # ⚙️ Généré automatiquement par Truffle
│   └── contracts/
│       └── Annonces.json          # ABI + bytecode compilé (ne pas modifier)
│
├── 📁 frontend/                   # Interface Web
│   ├── index.html                 # Page principale de la DApp
│   ├── style.css                  # Styles modernes : cartes, responsive, animations
│   └── app.js                     # Logique Web3.js : connexion MetaMask, appels contrat
│
├── truffle-config.js              # Configuration Truffle (réseau Ganache, compilateur)
├── package.json                   # Dépendances Node.js
└── README.md                      # Ce fichier 📄
```

> **Note :** Le dossier `build/` est généré après la compilation (`truffle compile`). Il contient l'ABI nécessaire à l'interaction avec le contrat depuis le frontend.

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

| Outil | Version recommandée | Lien d'installation |
|-------|--------------------|--------------------|
| **Node.js** | >= 16.x | [nodejs.org](https://nodejs.org/) |
| **npm** | >= 8.x | Inclus avec Node.js |
| **Truffle** | >= 5.x | `npm install -g truffle` |
| **Ganache** | Desktop ou CLI | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| **MetaMask** | Extension navigateur | [metamask.io](https://metamask.io/) |

Vérifier vos installations :

```bash
node --version       # v16.x.x ou supérieur
npm --version        # 8.x.x ou supérieur
truffle version      # Truffle v5.x.x
```

---

## 🚀 Installation et exécution

### Étape 1 — Cloner le dépôt

```bash
git clone https://github.com/<votre-utilisateur>/annonces-dapp.git
cd annonces-dapp
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Lancer Ganache

Ouvrez **Ganache Desktop** et créez un nouveau workspace avec la configuration suivante :

| Paramètre | Valeur |
|-----------|--------|
| RPC Server | `HTTP://127.0.0.1:7545` |
| Network ID | `1337` |
| Accounts | 10 comptes générés automatiquement |

> **Note :** Vous pouvez également utiliser Ganache CLI : `npx ganache-cli --port 7545 --networkId 1337`

### Étape 4 — Compiler le smart contract

```bash
truffle compile
```

Sortie attendue :

```
Compiling your contracts...
===========================
> Compiling ./contracts/Annonces.sol
> Artifacts written to /build/contracts
> Compiled successfully using:
   - solc: 0.8.x
```

### Étape 5 — Déployer sur Ganache

```bash
truffle migrate --network development
```

Sortie attendue :

```
Starting migrations...
======================
> Network name:    'development'
> Network id:      1337
> Block gas limit: 6721975 (0x6691b7)

2_deploy_annonces.js
====================
   Deploying 'Annonces'
   --------------------
   > transaction hash: 0xabc123...
   > contract address: 0xDef456...
   > block number:     1
   > gas used:         312345

Summary
=======
> Total deployments:   2
> Final cost:          0.00123456 ETH
```

📋 **Notez l'adresse du contrat** — elle sera utilisée dans `frontend/app.js`.

### Étape 6 — Configurer le frontend

Dans `frontend/app.js`, mettez à jour l'adresse du contrat déployé :

```javascript
// Remplacer par l'adresse affichée lors de la migration
const contractAddress = "0xDef456...";

// L'ABI est importée depuis le fichier build généré
const contractABI = [...]; // Copier depuis build/contracts/Annonces.json
```

### Étape 7 — Lancer le serveur local

```bash
# Avec npx et http-server (recommandé)
npx http-server frontend/ -p 3000

# Ou avec live-server
npx live-server frontend/ --port=3000
```

Ouvrez votre navigateur sur : **http://localhost:3000**

### Étape 8 — Configurer MetaMask

1. Ouvrez MetaMask dans votre navigateur
2. Ajoutez un réseau personnalisé :

| Champ | Valeur |
|-------|--------|
| Nom du réseau | `Ganache Local` |
| URL RPC | `http://127.0.0.1:7545` |
| Chain ID | `1337` |
| Symbole | `ETH` |

3. Importez un compte Ganache :
   - Dans Ganache, copiez la **clé privée** d'un compte (icône clé 🔑)
   - Dans MetaMask : **Importer un compte** → collez la clé privée

> **Note :** Le compte importé devrait afficher ~100 ETH de test — c'est normal, il s'agit d'ETH fictif sur le réseau local.

[Insérer capture : Configuration MetaMask avec le réseau Ganache Local]

---

## 🧪 Tests unitaires

Les tests sont écrits en JavaScript avec le framework intégré de Truffle (Mocha + Chai).

### Lancer les tests

```bash
truffle test
```

### Détail des cas de test

| # | Nom du test | Description |
|---|------------|-------------|
| 1 | `Ajout d'une annonce` | Vérifie qu'une annonce est bien enregistrée avec le bon message et l'adresse de l'émetteur |
| 2 | `Consultation d'une annonce inexistante` | Vérifie que la lecture d'un ID inexistant retourne une valeur vide / revert |
| 3 | `Comptage multiple` | Vérifie que le compteur s'incrémente correctement après plusieurs ajouts |

### Sortie attendue

```
  Contract: Annonces
    ✓ devrait ajouter une annonce et la retrouver par ID (120ms)
    ✓ devrait retourner une annonce vide pour un ID inexistant (45ms)
    ✓ devrait compter correctement plusieurs annonces (200ms)

  3 passing (1s)
```

[Insérer capture : Résultat de la commande `truffle test` dans le terminal]

---

## 🖥️ Utilisation de la DApp

### Connexion MetaMask

Au chargement de la page, la DApp détecte automatiquement MetaMask et demande l'autorisation de connexion.

[Insérer capture : Popup MetaMask demandant la connexion à l'application]

---

### 📝 Ajouter une annonce

1. Saisissez votre message dans le champ de texte
2. Cliquez sur le bouton **"Publier l'annonce"**
3. Confirmez la transaction dans MetaMask
4. Attendez la confirmation de la blockchain (quelques secondes sur Ganache)

[Insérer capture : Interface d'ajout d'une annonce avec le formulaire rempli]

[Insérer capture : Popup MetaMask pour confirmer la transaction]

---

### 🔍 Consulter une annonce par ID

1. Entrez l'identifiant de l'annonce dans le champ **"ID de l'annonce"**
2. Cliquez sur **"Consulter"**
3. Les détails s'affichent : message, adresse de l'émetteur, date

[Insérer capture : Résultat de la consultation d'une annonce avec les détails affichés]

---

### 🔢 Afficher le nombre total d'annonces

Cliquez sur **"Total des annonces"** — le compteur se met à jour instantanément (lecture seule, sans frais de gas).

[Insérer capture : Affichage du compteur total d'annonces]

---

## 📄 Détails du smart contract

### `Annonces.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Annonces {

    struct Annonce {
        uint256 id;
        string message;
        address emetteur;
        uint256 dateCreation;
    }

    mapping(uint256 => Annonce) private annonces;
    uint256 public nombreAnnonces;

    event AnnonceAjoutee(uint256 indexed id, string message, address indexed emetteur, uint256 dateCreation);

    function ajouterAnnonce(string memory _message) public {
        nombreAnnonces++;
        annonces[nombreAnnonces] = Annonce(nombreAnnonces, _message, msg.sender, block.timestamp);
        emit AnnonceAjoutee(nombreAnnonces, _message, msg.sender, block.timestamp);
    }

    function getAnnonce(uint256 _id) public view returns (uint256, string memory, address, uint256) {
        Annonce memory a = annonces[_id];
        return (a.id, a.message, a.emetteur, a.dateCreation);
    }

    function getNombreAnnonces() public view returns (uint256) {
        return nombreAnnonces;
    }
}
```

### Fonctions exposées

| Fonction | Type | Paramètre | Description |
|----------|------|-----------|-------------|
| `ajouterAnnonce(string)` | `public` | `_message` | Enregistre une nouvelle annonce (écrit sur la blockchain, coûte du gas) |
| `getAnnonce(uint256)` | `public view` | `_id` | Retourne les détails d'une annonce (lecture seule, gratuit) |
| `getNombreAnnonces()` | `public view` | — | Retourne le nombre total d'annonces (lecture seule, gratuit) |

### Structure de données — `Annonce`

```
┌────────────────────────────────────────────────────────┐
│                     struct Annonce                     │
├──────────────┬─────────────────────────────────────────┤
│ id           │ uint256  — Identifiant unique auto-incr. │
│ message      │ string   — Contenu de l'annonce          │
│ emetteur     │ address  — Adresse Ethereum de l'auteur  │
│ dateCreation │ uint256  — Timestamp Unix (block.timestamp) │
└──────────────┴─────────────────────────────────────────┘
```

### Événement

```solidity
event AnnonceAjoutee(
    uint256 indexed id,
    string message,
    address indexed emetteur,
    uint256 dateCreation
);
```

L'événement `AnnonceAjoutee` est émis à chaque ajout d'annonce. Il peut être écouté côté frontend via Web3.js :

```javascript
contract.events.AnnonceAjoutee({ fromBlock: 'latest' })
  .on('data', (event) => console.log('Nouvelle annonce :', event.returnValues));
```

---

## 🔍 Dépannage

### ❌ Erreur : `Could not connect to your Ethereum client`

**Cause :** Ganache n'est pas démarré ou écoute sur un port différent.

**Solution :**
```bash
# Vérifier que Ganache est lancé sur le port 7545
# Dans truffle-config.js, confirmer :
development: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "1337",
}
```

---

### ❌ Erreur : MetaMask ne se connecte pas / réseau non reconnu

**Cause :** MetaMask est connecté à un réseau différent (Mainnet, Goerli, etc.)

**Solution :**
1. Ouvrez MetaMask → cliquez sur le sélecteur de réseau en haut
2. Sélectionnez **"Ganache Local"** (ou ajoutez-le manuellement avec les paramètres de l'étape 8)
3. Assurez-vous que le Chain ID est bien `1337`

---

### ❌ Erreur : `Cannot read properties of undefined (reading 'methods')`

**Cause :** L'ABI ou l'adresse du contrat dans `app.js` est incorrecte ou obsolète.

**Solution :**
1. Recompilez et remigrez le contrat :
   ```bash
   truffle migrate --reset
   ```
2. Copiez la nouvelle adresse du contrat depuis la sortie de la migration
3. Mettez à jour `contractAddress` dans `frontend/app.js`
4. Vérifiez que l'ABI dans `app.js` correspond bien au contenu de `build/contracts/Annonces.json`

---

### ❌ Erreur : `Transaction has been reverted by the EVM`

**Cause :** La transaction a échoué (gas insuffisant, logique du contrat, compte non connecté).

**Solution :**
- Vérifiez que le compte MetaMask est bien connecté à la DApp
- Assurez-vous que le compte a suffisamment d'ETH de test (> 0)
- Vérifiez que le message passé en paramètre n'est pas vide

---

### ❌ Erreur 404 sur les fichiers de la DApp

**Cause :** Le serveur HTTP local n'est pas lancé depuis le bon dossier.

**Solution :**
```bash
# Lancer depuis la racine du projet en ciblant le dossier frontend/
npx http-server frontend/ -p 3000

# Vérifier que index.html est bien dans frontend/
ls frontend/
# > index.html  style.css  app.js
```

---

## 🔗 Liens utiles

| Ressource | Lien |
|-----------|------|
| 📘 Documentation Truffle | [trufflesuite.com/docs/truffle](https://trufflesuite.com/docs/truffle/) |
| 📗 Documentation Solidity | [docs.soliditylang.org](https://docs.soliditylang.org/) |
| 📙 Documentation Web3.js | [web3js.readthedocs.io](https://web3js.readthedocs.io/) |
| 🦊 MetaMask Developer Docs | [docs.metamask.io](https://docs.metamask.io/) |
| 🔶 Ganache | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| 🐙 Dépôt GitHub du projet | [github.com/\<votre-utilisateur\>/annonces-dapp](#) |

---

## 👤 Auteurs et remerciements

### Auteur(s)

| Nom | Rôle | Contact |
|-----|------|---------|
| `[Votre Nom]` | Développeur principal | [votre.email@example.com](mailto:votre.email@example.com) |
| `[Partenaire éventuel]` | Contribution | — |

### Encadrement

- `[Nom du professeur / encadrant]` — Encadrant pédagogique, `[Établissement]`

### Remerciements

- La communauté **Truffle Suite** pour leur outillage de développement Ethereum
- La documentation officielle **Solidity** et **Web3.js**
- **Ganache** pour la simulation blockchain locale rapide et fiable

---

<p align="center">
  Développé avec ❤️ dans le cadre d'un projet pédagogique sur la blockchain Ethereum
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Solidity-363636?style=flat-square&logo=solidity"/>
  <img src="https://img.shields.io/badge/Powered%20by-Ethereum-3C3C3D?style=flat-square&logo=ethereum"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
</p># 📢 DApp — Annonces de Classe

<p align="center">
  <img src="https://img.shields.io/badge/Solidity-0.8.x-363636?style=for-the-badge&logo=solidity&logoColor=white"/>
  <img src="https://img.shields.io/badge/Truffle-5.x-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white"/>
  <img src="https://img.shields.io/badge/Web3.js-1.x-F16822?style=for-the-badge&logo=javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ganache-Local-FF4F00?style=for-the-badge&logo=ethereum&logoColor=white"/>
  <img src="https://img.shields.io/badge/MetaMask-Extension-E2761B?style=for-the-badge&logo=metamask&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

<p align="center">
  <em>Une application décentralisée (DApp) permettant de publier et consulter des annonces de classe sur la blockchain Ethereum — développée à des fins pédagogiques.</em>
</p>

---

## 📋 Table des matières

- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture du projet](#-architecture-du-projet)
- [Prérequis](#-prérequis)
- [Installation et exécution](#-installation-et-exécution)
- [Tests unitaires](#-tests-unitaires)
- [Utilisation de la DApp](#-utilisation-de-la-dapp)
- [Détails du smart contract](#-détails-du-smart-contract)
- [Dépannage](#-dépannage)
- [Liens utiles](#-liens-utiles)
- [Auteurs et remerciements](#-auteurs-et-remerciements)

---

## 📖 Description

**Annonces de Classe** est une application décentralisée (DApp) développée dans le cadre d'un apprentissage pratique de la blockchain Ethereum. Elle permet à des utilisateurs connectés via **MetaMask** de :

- **Publier** des annonces sur un réseau Ethereum local (Ganache)
- **Consulter** une annonce par son identifiant
- **Afficher** le nombre total d'annonces enregistrées

Chaque annonce est stockée de façon **immuable** sur la blockchain : son auteur (adresse Ethereum), son contenu (message) et son horodatage (timestamp) sont accessibles à tout moment et ne peuvent pas être modifiés après publication.

> **Note pédagogique :** Ce projet illustre le cycle complet de développement d'une DApp : écriture d'un smart contract en Solidity, déploiement via Truffle sur Ganache, interaction via Web3.js, et intégration d'un wallet MetaMask dans une interface web moderne.

---

## ✅ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| ✅ Ajout d'annonce | Publier un message sur la blockchain via MetaMask |
| ✅ Consultation par ID | Retrouver une annonce grâce à son identifiant unique |
| ✅ Comptage total | Afficher le nombre d'annonces publiées |
| ✅ Horodatage | Chaque annonce possède un timestamp Unix automatique |
| ✅ Traçabilité | L'adresse Ethereum de l'émetteur est enregistrée |
| ✅ Interface moderne | Design responsive avec cartes et animations CSS |
| ✅ Tests unitaires | Suite de tests Truffle/JavaScript couvrant les cas clés |

---

## 🗂️ Architecture du projet

```
annonces-dapp/
│
├── 📁 contracts/                  # Smart contracts Solidity
│   └── Annonces.sol               # Contrat principal : stockage et lecture des annonces
│
├── 📁 migrations/                 # Scripts de déploiement Truffle
│   ├── 1_initial_migration.js     # Migration de base (Migrations.sol)
│   └── 2_deploy_annonces.js       # Déploiement du contrat Annonces
│
├── 📁 test/                       # Tests unitaires JavaScript (Truffle)
│   └── annonces.test.js           # 3 cas de test : ajout, consultation vide, comptage
│
├── 📁 build/                      # ⚙️ Généré automatiquement par Truffle
│   └── contracts/
│       └── Annonces.json          # ABI + bytecode compilé (ne pas modifier)
│
├── 📁 frontend/                   # Interface Web
│   ├── index.html                 # Page principale de la DApp
│   ├── style.css                  # Styles modernes : cartes, responsive, animations
│   └── app.js                     # Logique Web3.js : connexion MetaMask, appels contrat
│
├── truffle-config.js              # Configuration Truffle (réseau Ganache, compilateur)
├── package.json                   # Dépendances Node.js
└── README.md                      # Ce fichier 📄
```

> **Note :** Le dossier `build/` est généré après la compilation (`truffle compile`). Il contient l'ABI nécessaire à l'interaction avec le contrat depuis le frontend.

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

| Outil | Version recommandée | Lien d'installation |
|-------|--------------------|--------------------|
| **Node.js** | >= 16.x | [nodejs.org](https://nodejs.org/) |
| **npm** | >= 8.x | Inclus avec Node.js |
| **Truffle** | >= 5.x | `npm install -g truffle` |
| **Ganache** | Desktop ou CLI | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| **MetaMask** | Extension navigateur | [metamask.io](https://metamask.io/) |

Vérifier vos installations :

```bash
node --version       # v16.x.x ou supérieur
npm --version        # 8.x.x ou supérieur
truffle version      # Truffle v5.x.x
```

---

## 🚀 Installation et exécution

### Étape 1 — Cloner le dépôt

```bash
git clone https://github.com/<votre-utilisateur>/annonces-dapp.git
cd annonces-dapp
```

### Étape 2 — Installer les dépendances

```bash
npm install
```

### Étape 3 — Lancer Ganache

Ouvrez **Ganache Desktop** et créez un nouveau workspace avec la configuration suivante :

| Paramètre | Valeur |
|-----------|--------|
| RPC Server | `HTTP://127.0.0.1:7545` |
| Network ID | `1337` |
| Accounts | 10 comptes générés automatiquement |

> **Note :** Vous pouvez également utiliser Ganache CLI : `npx ganache-cli --port 7545 --networkId 1337`

### Étape 4 — Compiler le smart contract

```bash
truffle compile
```

Sortie attendue :

```
Compiling your contracts...
===========================
> Compiling ./contracts/Annonces.sol
> Artifacts written to /build/contracts
> Compiled successfully using:
   - solc: 0.8.x
```

### Étape 5 — Déployer sur Ganache

```bash
truffle migrate --network development
```

Sortie attendue :

```
Starting migrations...
======================
> Network name:    'development'
> Network id:      1337
> Block gas limit: 6721975 (0x6691b7)

2_deploy_annonces.js
====================
   Deploying 'Annonces'
   --------------------
   > transaction hash: 0xabc123...
   > contract address: 0xDef456...
   > block number:     1
   > gas used:         312345

Summary
=======
> Total deployments:   2
> Final cost:          0.00123456 ETH
```

📋 **Notez l'adresse du contrat** — elle sera utilisée dans `frontend/app.js`.

### Étape 6 — Configurer le frontend

Dans `frontend/app.js`, mettez à jour l'adresse du contrat déployé :

```javascript
// Remplacer par l'adresse affichée lors de la migration
const contractAddress = "0xDef456...";

// L'ABI est importée depuis le fichier build généré
const contractABI = [...]; // Copier depuis build/contracts/Annonces.json
```

### Étape 7 — Lancer le serveur local

```bash
# Avec npx et http-server (recommandé)
npx http-server frontend/ -p 3000

# Ou avec live-server
npx live-server frontend/ --port=3000
```

Ouvrez votre navigateur sur : **http://localhost:3000**

### Étape 8 — Configurer MetaMask

1. Ouvrez MetaMask dans votre navigateur
2. Ajoutez un réseau personnalisé :

| Champ | Valeur |
|-------|--------|
| Nom du réseau | `Ganache Local` |
| URL RPC | `http://127.0.0.1:7545` |
| Chain ID | `1337` |
| Symbole | `ETH` |

3. Importez un compte Ganache :
   - Dans Ganache, copiez la **clé privée** d'un compte (icône clé 🔑)
   - Dans MetaMask : **Importer un compte** → collez la clé privée

> **Note :** Le compte importé devrait afficher ~100 ETH de test — c'est normal, il s'agit d'ETH fictif sur le réseau local.

[Insérer capture : Configuration MetaMask avec le réseau Ganache Local]

---

## 🧪 Tests unitaires

Les tests sont écrits en JavaScript avec le framework intégré de Truffle (Mocha + Chai).

### Lancer les tests

```bash
truffle test
```

### Détail des cas de test

| # | Nom du test | Description |
|---|------------|-------------|
| 1 | `Ajout d'une annonce` | Vérifie qu'une annonce est bien enregistrée avec le bon message et l'adresse de l'émetteur |
| 2 | `Consultation d'une annonce inexistante` | Vérifie que la lecture d'un ID inexistant retourne une valeur vide / revert |
| 3 | `Comptage multiple` | Vérifie que le compteur s'incrémente correctement après plusieurs ajouts |

### Sortie attendue

```
  Contract: Annonces
    ✓ devrait ajouter une annonce et la retrouver par ID (120ms)
    ✓ devrait retourner une annonce vide pour un ID inexistant (45ms)
    ✓ devrait compter correctement plusieurs annonces (200ms)

  3 passing (1s)
```

[Insérer capture : Résultat de la commande `truffle test` dans le terminal]

---

## 🖥️ Utilisation de la DApp

### Connexion MetaMask

Au chargement de la page, la DApp détecte automatiquement MetaMask et demande l'autorisation de connexion.

[Insérer capture : Popup MetaMask demandant la connexion à l'application]

---

### 📝 Ajouter une annonce

1. Saisissez votre message dans le champ de texte
2. Cliquez sur le bouton **"Publier l'annonce"**
3. Confirmez la transaction dans MetaMask
4. Attendez la confirmation de la blockchain (quelques secondes sur Ganache)

[Insérer capture : Interface d'ajout d'une annonce avec le formulaire rempli]

[Insérer capture : Popup MetaMask pour confirmer la transaction]

---

### 🔍 Consulter une annonce par ID

1. Entrez l'identifiant de l'annonce dans le champ **"ID de l'annonce"**
2. Cliquez sur **"Consulter"**
3. Les détails s'affichent : message, adresse de l'émetteur, date

[Insérer capture : Résultat de la consultation d'une annonce avec les détails affichés]

---

### 🔢 Afficher le nombre total d'annonces

Cliquez sur **"Total des annonces"** — le compteur se met à jour instantanément (lecture seule, sans frais de gas).

[Insérer capture : Affichage du compteur total d'annonces]

---

## 📄 Détails du smart contract

### `Annonces.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Annonces {

    struct Annonce {
        uint256 id;
        string message;
        address emetteur;
        uint256 dateCreation;
    }

    mapping(uint256 => Annonce) private annonces;
    uint256 public nombreAnnonces;

    event AnnonceAjoutee(uint256 indexed id, string message, address indexed emetteur, uint256 dateCreation);

    function ajouterAnnonce(string memory _message) public {
        nombreAnnonces++;
        annonces[nombreAnnonces] = Annonce(nombreAnnonces, _message, msg.sender, block.timestamp);
        emit AnnonceAjoutee(nombreAnnonces, _message, msg.sender, block.timestamp);
    }

    function getAnnonce(uint256 _id) public view returns (uint256, string memory, address, uint256) {
        Annonce memory a = annonces[_id];
        return (a.id, a.message, a.emetteur, a.dateCreation);
    }

    function getNombreAnnonces() public view returns (uint256) {
        return nombreAnnonces;
    }
}
```

### Fonctions exposées

| Fonction | Type | Paramètre | Description |
|----------|------|-----------|-------------|
| `ajouterAnnonce(string)` | `public` | `_message` | Enregistre une nouvelle annonce (écrit sur la blockchain, coûte du gas) |
| `getAnnonce(uint256)` | `public view` | `_id` | Retourne les détails d'une annonce (lecture seule, gratuit) |
| `getNombreAnnonces()` | `public view` | — | Retourne le nombre total d'annonces (lecture seule, gratuit) |

### Structure de données — `Annonce`

```
┌────────────────────────────────────────────────────────┐
│                     struct Annonce                     │
├──────────────┬─────────────────────────────────────────┤
│ id           │ uint256  — Identifiant unique auto-incr. │
│ message      │ string   — Contenu de l'annonce          │
│ emetteur     │ address  — Adresse Ethereum de l'auteur  │
│ dateCreation │ uint256  — Timestamp Unix (block.timestamp) │
└──────────────┴─────────────────────────────────────────┘
```

### Événement

```solidity
event AnnonceAjoutee(
    uint256 indexed id,
    string message,
    address indexed emetteur,
    uint256 dateCreation
);
```

L'événement `AnnonceAjoutee` est émis à chaque ajout d'annonce. Il peut être écouté côté frontend via Web3.js :

```javascript
contract.events.AnnonceAjoutee({ fromBlock: 'latest' })
  .on('data', (event) => console.log('Nouvelle annonce :', event.returnValues));
```

---

## 🔍 Dépannage

### ❌ Erreur : `Could not connect to your Ethereum client`

**Cause :** Ganache n'est pas démarré ou écoute sur un port différent.

**Solution :**
```bash
# Vérifier que Ganache est lancé sur le port 7545
# Dans truffle-config.js, confirmer :
development: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "1337",
}
```

---

### ❌ Erreur : MetaMask ne se connecte pas / réseau non reconnu

**Cause :** MetaMask est connecté à un réseau différent (Mainnet, Goerli, etc.)

**Solution :**
1. Ouvrez MetaMask → cliquez sur le sélecteur de réseau en haut
2. Sélectionnez **"Ganache Local"** (ou ajoutez-le manuellement avec les paramètres de l'étape 8)
3. Assurez-vous que le Chain ID est bien `1337`

---

### ❌ Erreur : `Cannot read properties of undefined (reading 'methods')`

**Cause :** L'ABI ou l'adresse du contrat dans `app.js` est incorrecte ou obsolète.

**Solution :**
1. Recompilez et remigrez le contrat :
   ```bash
   truffle migrate --reset
   ```
2. Copiez la nouvelle adresse du contrat depuis la sortie de la migration
3. Mettez à jour `contractAddress` dans `frontend/app.js`
4. Vérifiez que l'ABI dans `app.js` correspond bien au contenu de `build/contracts/Annonces.json`

---

### ❌ Erreur : `Transaction has been reverted by the EVM`

**Cause :** La transaction a échoué (gas insuffisant, logique du contrat, compte non connecté).

**Solution :**
- Vérifiez que le compte MetaMask est bien connecté à la DApp
- Assurez-vous que le compte a suffisamment d'ETH de test (> 0)
- Vérifiez que le message passé en paramètre n'est pas vide

---

### ❌ Erreur 404 sur les fichiers de la DApp

**Cause :** Le serveur HTTP local n'est pas lancé depuis le bon dossier.

**Solution :**
```bash
# Lancer depuis la racine du projet en ciblant le dossier frontend/
npx http-server frontend/ -p 3000

# Vérifier que index.html est bien dans frontend/
ls frontend/
# > index.html  style.css  app.js
```

---

## 🔗 Liens utiles

| Ressource | Lien |
|-----------|------|
| 📘 Documentation Truffle | [trufflesuite.com/docs/truffle](https://trufflesuite.com/docs/truffle/) |
| 📗 Documentation Solidity | [docs.soliditylang.org](https://docs.soliditylang.org/) |
| 📙 Documentation Web3.js | [web3js.readthedocs.io](https://web3js.readthedocs.io/) |
| 🦊 MetaMask Developer Docs | [docs.metamask.io](https://docs.metamask.io/) |
| 🔶 Ganache | [trufflesuite.com/ganache](https://trufflesuite.com/ganache/) |
| 🐙 Dépôt GitHub du projet | [github.com/\<votre-utilisateur\>/annonces-dapp](#) |

---

## 👤 Auteurs et remerciements

### Auteurs

| Nom | Rôle | Contact |
|-----|------|---------|
| `DIAWANE - R` | Développeur | [rdiawane2001@gmail.com](mailto:votre.email@example.com) |
| `BENZEKRY - Aimée A` | Développeur | [benzekryawa@gmail.com](mailto:votre.email@example.com) |

### Encadrement

- `Mme AZBEG` — Encadrant pédagogique, `HESTIM`

### Remerciements

- La communauté **Truffle Suite** pour leur outillage de développement Ethereum
- La documentation officielle **Solidity** et **Web3.js**
- **Ganache** pour la simulation blockchain locale rapide et fiable

---

<p align="center">
  Développé avec ❤️ dans le cadre d'un projet pédagogique sur la blockchain Ethereum
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Solidity-363636?style=flat-square&logo=solidity"/>
  <img src="https://img.shields.io/badge/Powered%20by-Ethereum-3C3C3D?style=flat-square&logo=ethereum"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
</p>