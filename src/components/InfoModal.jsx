import React from 'react';

export function InfoModal({ data, onClose }) {
    if (!data) return null;

    return (
        <div id="info-modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 id="modal-title">{data.title}</h2>
                <div className="modal-line"></div>
                <p id="modal-desc">{data.desc}</p>
                <ul id="modal-stats">
                    {data.stats.map((stat, index) => (
                        <li key={index}>{stat}</li>
                    ))}
                </ul>
                <button id="close-modal-btn" onClick={onClose}>CLOSE TERMINAL</button>
            </div>
        </div>
    );
}
