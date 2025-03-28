function updateDiscordStatus() {
    fetch('https://api.lanyard.rest/v1/users/1280375078873337938')
        .then(response => response.json())
        .then(data => {
            const status = data.data;
            let activityText = '';

            if (status.spotify) {
                activityText = `
                    <div class="discord-activity spotify-activity">
                        <img src="${status.spotify.album_art_url}" class="spotify-art" alt="Album Art">
                        <div class="spotify-info">
                            <div class="spotify-song">
                                <a href="https://open.spotify.com/track/${status.spotify.track_id}" target="_blank" class="spotify-link">
                                    ${status.spotify.song}
                                </a>
                            </div>
                            <div class="spotify-artist">by ${status.spotify.artist}</div>
                        </div>
                    </div>`;
            } else if (status.activities && status.activities.some(activity => activity.type === 0)) {
                const game = status.activities.find(activity => activity.type === 0);
                activityText = `
                    <div class="discord-activity">
                        <div class="game-info">
                            <div class="game-name">Playing ${game.name}</div>
                            ${game.details ? `<div class="game-details">${game.details}</div>` : ''}
                            ${game.state ? `<div class="game-state">${game.state}</div>` : ''}
                        </div>
                    </div>`;
            } else if (status.activities && status.activities.some(activity => activity.type === 4)) {
                const customStatus = status.activities.find(activity => activity.type === 4);
                activityText = `
                    <div class="discord-activity">
                        ${customStatus.state || customStatus.emoji?.name || ''}
                    </div>`;
            }
            
            let statusHTML = `
                <div class="discord-status-container">
                    <div class="discord-profile">
                        <img src="img/pfp.jpg" class="discord-pfp" alt="Profile Picture">
                        <div class="discord-info">
                            <div class="discord-username">
                                <a href="https://discord.com/users/1280375078873337938" target="_blank" class="discord-link">
                                    ${status.discord_user.display_name}
                                </a>
                                <span class="discord-status-indicator ${status.discord_status}"></span>
                            </div>
                            ${activityText}
                        </div>
                    </div>
                </div>
            `;

            document.querySelector('.discord-status').outerHTML = statusHTML;
        })
        .catch(error => console.error('Error fetching Discord status:', error));
}

updateDiscordStatus();

setInterval(updateDiscordStatus, 30000);
