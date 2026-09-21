import { useEffect, useState } from "react";

const MemberList = ({ onSelectMember }) => {
    const [members, setMembers] = useState([]);

    const getMembers = () => {
        fetch("http://localhost:8080/api/members")
            .then((response) => response.json())
            .then((data) => setMembers(data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <div className="card">
            <h2>회원 목록</h2>

            {members.length === 0 ? (
                <div className="empty">
                    등록된 회원이 없습니다.
                </div>
            ) : (
                <div className="list">
                    {members.map((member) => (
                        <div
                            className="list-item"
                            key={member.id}
                        >
                            <div className="list-item-header">
                                <h3>{member.name}</h3>

                                <span className="badge">
                                    ID {member.id}
                                </span>
                            </div>

                            <p>이메일 : {member.email}</p>
                            <p>나이 : {member.age}세</p>

                            <div className="button-group">
                                <button
                                    onClick={() =>
                                        onSelectMember(member.id)
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

export default MemberList;