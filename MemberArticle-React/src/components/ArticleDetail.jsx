import { useEffect, useState } from "react";

const ArticleDetail = ({
                           articleId,
                           onBack,
                           onArticleChanged,
                       }) => {
    const [article, setArticle] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const getArticle = () => {
        fetch(`http://localhost:8080/api/articles/${articleId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "게시글 정보를 가져오지 못했습니다."
                    );
                }

                return response.json();
            })
            .then((data) => {
                setArticle(data);

                setTitle(data.title);
                setDescription(data.description);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getArticle();
    }, [articleId]);

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/articles/${articleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "게시글 수정에 실패했습니다."
                    );
                }

                return response.json();
            })
            .then((data) => {
                setArticle(data);

                alert("게시글이 수정되었습니다.");

                onArticleChanged();
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 수정에 실패했습니다.");
            });
    };

    const handleDelete = () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        fetch(`http://localhost:8080/api/articles/${articleId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "게시글 삭제에 실패했습니다."
                    );
                }

                alert("게시글이 삭제되었습니다.");

                onArticleChanged();
                onBack();
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 삭제에 실패했습니다.");
            });
    };

    if (!article) {
        return <p>게시글 정보를 불러오는 중...</p>;
    }

    return (
        <div>
            <h2>게시글 상세</h2>

            <p>게시글 번호: {article.id}</p>
            <p>작성자 번호: {article.memberId}</p>
            <p>작성자: {article.name}</p>
            <p>이메일: {article.email}</p>

            <form onSubmit={handleUpdate}>
                <div>
                    <label>제목</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />
                </div>

                <div>
                    <label>내용</label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </div>

                <button type="submit">
                    게시글 수정
                </button>
            </form>

            <button onClick={handleDelete}>
                게시글 삭제
            </button>

            <button onClick={onBack}>
                목록으로
            </button>
        </div>
    );
};

export default ArticleDetail;