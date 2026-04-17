// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Annonces {
    struct Annonce {
        uint id;
        string message;
        address emetteur;
        uint dateCreation;
    }

    uint private compteurId;  // auto-incrément
    mapping(uint => Annonce) public annonces;

    event AnnonceAjoutee(uint id, address emetteur, string message, uint date);

    // Ajouter une nouvelle annonce
    function ajouterAnnonce(string memory _message) public {
        compteurId++;
        uint nouveauId = compteurId;
        annonces[nouveauId] = Annonce({
            id: nouveauId,
            message: _message,
            emetteur: msg.sender,
            dateCreation: block.timestamp
        });
        emit AnnonceAjoutee(nouveauId, msg.sender, _message, block.timestamp);
    }

    // Consulter une annonce par son identifiant
    function getAnnonce(uint _id) public view returns (uint, string memory, address, uint) {
        require(_id > 0 && _id <= compteurId, "Annonce inexistante");
        Annonce memory a = annonces[_id];
        return (a.id, a.message, a.emetteur, a.dateCreation);
    }

    // Nombre total d'annonces
    function getNombreAnnonces() public view returns (uint) {
        return compteurId;
    }
}