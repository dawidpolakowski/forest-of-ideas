class IdeasPortal {
    constructor() {
        this.container = document.getElementById("ideas-container");
        this.searchInput = document.getElementById("search-input");
        this.tagsContainer = document.getElementById("tags-container");
        this.resultCount = document.getElementById("result-count");
        this.selectedTag = null;

        this.init();
    }

    init() {
        this.updateStats();
        this.renderTags();
        this.renderIdeas();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.searchInput.addEventListener("input", () => this.renderIdeas());
    }

    updateStats() {
        const totalIdeas = ideas.length;
        const categories = [...new Set(ideas.map(idea => idea.category))];
        const tags = [...new Set(ideas.flatMap(idea => idea.tags))];
        const gamesCount = ideas.filter(idea => idea.category === "Games").length;

        document.getElementById("total-ideas").textContent = totalIdeas;
        document.getElementById("category-count").textContent = categories.length;
        document.getElementById("tag-count").textContent = tags.length;

        const gamesCountEl = document.getElementById("games-count");
        if (gamesCountEl) {
            gamesCountEl.textContent = gamesCount;
        }
    }

    renderTags() {
        const allTags = [...new Set(ideas.flatMap(idea => idea.tags))].sort();

        this.tagsContainer.innerHTML = "";

        allTags.forEach(tag => {
            const btn = document.createElement("button");
            btn.className = "tag";
            btn.textContent = tag;

            btn.addEventListener("click", () => {
                this.selectedTag = this.selectedTag === tag ? null : tag;
                this.renderIdeas();
                this.updateActiveTag();
            });

            this.tagsContainer.appendChild(btn);
        });
    }

    updateActiveTag() {
        document.querySelectorAll(".tags-container .tag").forEach(btn => {
            btn.classList.toggle("active", btn.textContent === this.selectedTag);
        });
    }

    renderIdeas() {
        const searchTerm = this.searchInput.value.toLowerCase();

        const filtered = ideas.filter(idea => {
            const matchesSearch =
                idea.title.toLowerCase().includes(searchTerm) ||
                idea.tags.join(" ").toLowerCase().includes(searchTerm);

            const matchesTag = !this.selectedTag || idea.tags.includes(this.selectedTag);

            return matchesSearch && matchesTag;
        });

        this.resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'result' : 'results'}`;

        this.container.innerHTML = "";

        if (filtered.length === 0) {
            this.container.innerHTML = '<div class="no-results">No ideas match your search</div>';
            return;
        }

        filtered.forEach(idea => {
            const card = document.createElement("a");
            card.href = idea.file;
            card.className = "idea-card";

            card.innerHTML = `
                <div class="idea-card-link">
                    <span class="card-category">${idea.category}</span>
                    <h3>${idea.title}</h3>
                    <p class="idea-card-description">${idea.description || ''}</p>
                    <div class="idea-card-footer">
                        <div class="tags">${idea.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
                    </div>
                </div>
            `;

            this.container.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new IdeasPortal();
});
