import { useState } from "react";

const ArticleForm = ({ members, onArticleCreated }) => {
    const [memberId, setMemberId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!memberId) {
            alert("작성자를 선택해주세요.");
            return;
        }

        fetch(
            `http://localhost:8080/api/articles?memberId=${memberId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("게시글 등록에 실패했습니다.");
                }

                return response.json();
            })
            .then(() => {
                alert("게시글이 등록되었습니다.");

                setMemberId("");
                setTitle("");
                setDescription("");

                onArticleCreated();
            })
            .catch((error) => {
                console.error(error);
                alert("게시글 등록에 실패했습니다.");
            });
    };

    return (
        <div className="card">
            <h2>게시글 등록</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">

                    <div className="form-group full">
                        <label>작성자</label>

                        <select
                            value={memberId}
                            onChange={(e) =>
                                setMemberId(e.target.value)
                            }
                        >
                            <option value="">
                                작성자를 선택하세요
                            </option>

                            {members.map((member) => (
                                <option
                                    key={member.id}
                                    value={member.id}
                                >
                                    {member.name} - {member.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group full">
                        <label>제목</label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="게시글 제목을 입력하세요"
                        />
                    </div>

                    <div className="form-group full">
                        <label>내용</label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="게시글 내용을 입력하세요"
                        />
                    </div>

                </div>

                <div className="button-group">
                    <button type="submit">
                        게시글 등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;