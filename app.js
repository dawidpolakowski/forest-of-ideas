class IdeasPortal {
    constructor() {
        this.container = document.getElementById("ideas-container");
        this.searchInput = document.getElementById("search-input");
        this.tagsContainer = document.getElementById("tags-container");
        this.selectedTag = null;

        this.init();
    }

    init() {
        this.renderTags();
        this.renderIdeas();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.searchInput.addEventListener("input", () => this.renderIdeas());
    }

    renderTags() {
        const allTags = [...new Set(ideas.flatMap(idea => idea.tags))];

        allTags.forEach(tag => {
            const btn = document.createElement("button");
            btn.className = "tag-btn";
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
        document.querySelectorAll(".tag-btn").forEach(btn => {
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

        this.container.innerHTML = "";

        if (filtered.length === 0) {
            this.container.innerHTML = '<div class="no-results">No ideas found</div>';
            return;
        }

        filtered.forEach(idea => {
            const card = document.createElement("a");
            card.href = idea.file;
            card.className = "idea-card";

            card.innerHTML = `
                <div class="card-header">
                    <h3>${idea.title}</h3>
                </div>
                <div class="card-body">
                    <p class="category">${idea.category}</p>
                    <div class="tags">${idea.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
                </div>
            `;

            this.container.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new IdeasPortal();
});
