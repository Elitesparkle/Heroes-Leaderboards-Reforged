// ==UserScript==
// @name         Heroes Leaderboards Reforged
// @namespace    mailto:elitesparkle.gaming@gmail.com
// @version      1.1
// @description  Improve the Grand Master Leaderboards for Heroes of the Storm. Fix headers for Melee Assassin and Healer. Add columns for Win Rate and Main Role.
// @author       Elitesparkle
// @license      MIT License
// @match        https://heroesofthestorm.blizzard.com/*/leaderboards/*/*/*/
// @icon         https://blznav.akamaized.net/img/games/logo-heroes-78cae505b7a524fb.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener("load", function () {
        let table = document.querySelector("table");
        let game_mode = document.URL.split("/")[5];

        let win_rate_column = 4;
        let role_column = 7;
        let last_column;

        let cell = table.rows[0].insertCell(win_rate_column);
        cell.innerText = "Win Rate";
        cell.style.textAlign = "center";
        cell.style.fontWeight = "bold";

        if (game_mode == "storm") {
            let healer = table.rows[0].cells[10].innerHTML;
            let melee_assassin = table.rows[0].cells[11].innerHTML;
            table.rows[0].cells[10].innerHTML = melee_assassin;
            table.rows[0].cells[11].innerHTML = healer;

            last_column = 12;
        }
        else {
            last_column = 10;
        }

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
                cell.style.color = "#FFFF00"; // Yellow
            }
            else {
                cell.style.color = "#FF0000"; // Red
            }

            let max_preference = parseFloat(table.rows[i].cells[last_column].innerText);
            let role_preference = table.rows[0].cells[last_column].innerHTML;

            for (let j = 7; j <= last_column; j++) {
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