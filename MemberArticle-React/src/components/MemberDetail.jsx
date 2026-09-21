import { useEffect, useState } from "react";

const MemberDetail = ({ memberId, onBack, onMemberChanged }) => {
    const [member, setMember] = useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");

    const getMember = () => {
        fetch(`http://localhost:8080/api/members/${memberId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("회원 정보를 가져오지 못했습니다.");
                }

                return response.json();
            })
            .then((data) => {
                setMember(data);

                setName(data.name);
                setEmail(data.email);
                setPassword(data.password ?? "");
                setAge(data.age);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getMember();
    }, [memberId]);

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/api/members/${memberId}`, {
            method: "PUT",
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
                    throw new Error("회원 수정에 실패했습니다.");
                }

                return response.json();
            })
            .then((data) => {
                setMember(data);

                alert("회원 정보가 수정되었습니다.");

                onMemberChanged();
            })
            .catch((error) => {
                console.error(error);
                alert("회원 수정에 실패했습니다.");
            });
    };

    const handleDelete = () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        fetch(`http://localhost:8080/api/members/${memberId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("회원 삭제에 실패했습니다.");
                }

                alert("회원이 삭제되었습니다.");

                onMemberChanged();
                onBack();
            })
            .catch((error) => {
                console.error(error);
                alert("회원 삭제에 실패했습니다.");
            });
    };

    if (!member) {
        return <p>회원 정보를 불러오는 중...</p>;
    }

    return (
        <div>
            <h2>회원 상세</h2>

            <p>회원 번호: {member.id}</p>

            <form onSubmit={handleUpdate}>
                <div>
                    <label>이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label>나이</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <button type="submit">
                    회원 수정
                </button>
            </form>

            <button onClick={handleDelete}>
                회원 삭제
            </button>

            <button onClick={onBack}>
                목록으로
            </button>
        </div>
    );
};

export default MemberDetail;