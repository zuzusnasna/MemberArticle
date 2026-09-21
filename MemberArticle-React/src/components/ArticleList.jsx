import { useEffect, useState } from "react";

const ArticleList = ({ onSelectArticle, refreshKey }) => {
    const [articles, setArticles] = useState([]);

    const getArticles = () => {
        fetch("http://localhost:8080/api/articles")
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getArticles();
    }, [refreshKey]);

    return (
        <div className="card">
            <h2>게시글 목록</h2>

            {articles.length === 0 ? (
                <div className="empty">
                    등록된 게시글이 없습니다.
                </div>
            ) : (
                <div className="list">
                    {articles.map((article) => (
                        <div
                            className="list-item"
                            key={article.id}
                        >
                            <div className="list-item-header">
                                <h3>{article.title}</h3>

                                <span className="badge">
                                    #{article.id}
                                </span>
                            </div>

                            <p>
                                작성자 : {article.name}
                            </p>

                            <p>
                                {article.description}
                            </p>

                            <div className="button-group">
                                <button
                                    onClick={() =>
                                        onSelectArticle(article.id)
                                    }
                                >
                                    상세보기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticleList;