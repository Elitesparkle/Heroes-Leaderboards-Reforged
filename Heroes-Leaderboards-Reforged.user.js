// ==UserScript==
// @name         Heroes Leaderboards Reforged
// @namespace    mailto:elitesparkle.gaming@gmail.com
// @version      1.0
// @description  Improve the official Grand Master Leaderboards for Heroes of the Storm. Fix headers for Melee Assassin and Healer. Add columns for Win Rate and Main Role.
// @author       Elitesparkle
// @license      MIT License
// @match        https://heroesofthestorm.blizzard.com/*/leaderboards/*/*/*/
// @icon         https://blznav.akamaized.net/img/games/logo-heroes-78cae505b7a524fb.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", function () {
        let table_header = document.querySelectorAll("th");

        let win_rate_column = 4;
        let role_column = 7;

        let healer = table_header[9].innerHTML;
        let melee_assassin = table_header[10].innerHTML;

        table_header[9].innerHTML = melee_assassin;
        table_header[10].innerHTML = healer;

        let games = table_header[4];
        let wins = table_header[5];
        let win_rate = "Win Rate";

        let table = document.querySelector("table");

        let cell = table.rows[0].insertCell(win_rate_column);
        cell.innerText = "Win Rate";
        cell.style.textAlign = "center";
        cell.style.fontWeight = "bold";

        for (let i = 1; i < table.rows.length; i++) {
            let wins = table.rows[i].cells[5].innerText;
            let games = table.rows[i].cells[4].innerText;
            let win_rate = (wins / games * 100).toFixed();

            let cell = table.rows[i].insertCell(win_rate_column);
            cell.innerHTML = win_rate + "%";
            cell.style.textAlign = "center";

            if (win_rate >= 70) {
                cell.style.color = "#00FFFF"; // Cyan
            }
            else if (win_rate >= 60) {
                cell.style.color = "#00FF00"; // Green
            }
            else if (win_rate >= 50) {
                cell.style.color = "#FFFF00"; // Lime
            }
            else {
                cell.style.color = "#FF0000"; // Red
            }

            let max_preference = parseFloat(table.rows[i].cells[12].innerText);
            let role_preference = table.rows[0].cells[12].innerHTML;

            for (let j = 7; j <= 12; j++) {
                let preference = parseFloat(table.rows[i].cells[j].innerText);
                if (preference > max_preference) {
                    max_preference = preference;
                    role_preference = table.rows[0].cells[j].innerHTML;
                }
            }

            cell = table.rows[i].insertCell(role_column);
            cell.innerHTML = role_preference;
            cell.setAttribute("align", "center");
            cell.style.verticalAlign = "bottom";
        }

        cell = table.rows[0].insertCell(role_column);
        cell.innerText = "Main Role";
        cell.style.textAlign = "center";
        cell.style.fontWeight = "bold";
    }, false)
})();