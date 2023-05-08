import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

const fetchClubs = async () => {
  try {
    const response = await fetch("https://skifb-admin.be/api/ClubsAPI/GetAllClubsName?lang=EN");
    const data = await response.json();
    const clubNames = data.map((club) => club.title);
    return clubNames;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste des clubs:", error);
  }
};

export default function DropdownClub({ onClubSelected }) {
  const [selectedClub, setSelectedClub] = useState("");
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    const getClubs = async () => {
      const clubList = await fetchClubs();
      if (Array.isArray(clubList)) {
        setClubs(clubList);
      } else {
        console.error("L'API n'a pas renvoyé un tableau");
      }
    };
    getClubs();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedClub || "Sélectionnez un club"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {clubs &&
        clubs.map((club, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => {
              setSelectedClub(club);
              if (onClubSelected) {
                onClubSelected(club);
              }
            }}
          >
            {club}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
