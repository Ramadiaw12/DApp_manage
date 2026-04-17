const Annonces = artifacts.require("Annonces");

contract("Annonces", (accounts) => {
  let instance;
  const [emetteur1, emetteur2] = accounts;

  beforeEach(async () => {
    instance = await Annonces.new();
  });

  it("devrait ajouter une annonce et retourner les bonnes infos", async () => {
    await instance.ajouterAnnonce("Cours de maths le lundi", { from: emetteur1 });
    const total = await instance.getNombreAnnonces();
    assert.equal(total, 1, "Le nombre total devrait être 1");

    const annonce = await instance.getAnnonce(1);
    assert.equal(annonce[0], 1, "ID incorrect");
    assert.equal(annonce[1], "Cours de maths le lundi", "Message incorrect");
    assert.equal(annonce[2], emetteur1, "Émetteur incorrect");
    assert.isNumber(Number(annonce[3]), "La date doit être un nombre");
  });

  it("devrait rejeter la consultation d'une annonce inexistante", async () => {
    try {
      await instance.getAnnonce(99);
      assert.fail("La requête aurait dû échouer");
    } catch (error) {
      assert(error.message.includes("Annonce inexistante"), "Mauvais message d'erreur");
    }
  });

  it("devrait compter correctement plusieurs annonces", async () => {
    await instance.ajouterAnnonce("Première", { from: emetteur1 });
    await instance.ajouterAnnonce("Seconde", { from: emetteur2 });
    const total = await instance.getNombreAnnonces();
    assert.equal(total, 2);
  });
});