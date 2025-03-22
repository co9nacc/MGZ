document.addEventListener("DOMContentLoaded", () => {
  fetch("https://mgz-backend-ajhp.onrender.com")  // 백엔드에서 아티클 데이터 가져오기
      .then(response => response.json())  // JSON 형식으로 변환
    .then(articles => {
        const articleContainer = document.getElementById("articles-container");
          articleContainer.innerHTML = "";  // 기존 내용 삭제

        articles.forEach(article => {
            const articleElement = document.createElement("div");
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <small>작성자: ${article.author}</small>
            `;
            articleContainer.appendChild(articleElement);
        });
    })
    .catch(error => console.error("❌ 데이터 불러오기 실패:", error));
});
