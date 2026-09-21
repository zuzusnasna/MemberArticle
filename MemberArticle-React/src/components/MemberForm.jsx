import { useState } from "react";

const MemberForm = ({ onMemberCreated }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                age: Number(age),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("회원 등록에 실패했습니다.");
                }

                return response.json();
            })
            .then(() => {
                alert("회원이 등록되었습니다.");

                setName("");
                setEmail("");
                setPassword("");
                setAge("");

                onMemberCreated();
            })
            .catch((error) => {
                console.error(error);
                alert("회원 등록에 실패했습니다.");
            });
    };

    return (
        <div className="card">
            <h2>회원 등록</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">

                    <div className="form-group">
                        <label>이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    <div className="form-group">
                        <label>나이</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="나이"
                        />
                    </div>

                </div>

                <div className="button-group">
                    <button type="submit">
                        회원 등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MemberForm;