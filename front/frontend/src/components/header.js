import React from "react";
import '../styles/challenges.css';

function Challenges() {
    return (
        <div>
        <h1>Challenges</h1>
       
    <div class="cards-container">
        <ul class="cards" style="--items: 26;">
            <li style="--i: 01;">
                <input type="radio" id="item-23" name="gallery-item"/>
                <label for="item-23">2023</label>
                <h2>2023</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, perspiciatis dicta? In nihil quidem sunt omnis facilis quas corporis at, officia itaque!</p>
            </li>
            <li style="--i: 02;">
                <input type="radio" id="item-24" name="gallery-item"/>
                <label for="item-24">2024</label>
                <h2>2024</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, perspiciatis dicta? In nihil quidem sunt omnis facilis quas corporis at, officia itaque!</p>
            </li>
            <li style="--i: 03;">
                <input type="radio" id="item-25" name="gallery-item"/>
                <label for="item-25">2025</label>
                <h2>2025</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, perspiciatis dicta? In nihil quidem sunt omnis facilis quas corporis at, officia itaque!</p>
            </li>
        </ul>
  </div>
        </div>
    );
    }

export default Challenges;