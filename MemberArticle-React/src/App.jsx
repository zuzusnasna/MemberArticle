import { useEffect, useState } from "react";

import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import MemberDetail from "./components/MemberDetail";

import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";

const App = () => {
    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [articleRefreshKey, setArticleRefreshKey] = useState(0);

    const getMembers = () => {
        fetch("http://localhost:8080/api/members")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("회원 목록을 가져오지 못했습니다.");
                }

                return response.json();
            })
            .then((data) => {
                setMembers(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        getMembers();
    }, []);

    const handleSelectMember = (id) => {
        setSelectedMemberId(id);
        setSelectedArticleId(null);
    };

    const handleBackMember = () => {
        setSelectedMemberId(null);
        getMembers();
    };

    const handleSelectArticle = (id) => {
        setSelectedArticleId(id);
        setSelectedMemberId(null);
    };

    const handleBackArticle = () => {
        setSelectedArticleId(null);
    };

    const handleArticleChanged = () => {
        setArticleRefreshKey((prev) => prev + 1);
    };

    // 회원 상세
    if (selectedMemberId !== null) {
        return (
            <div className="container">
                <div className="header">
                    <h1>Member Article</h1>
                    <p>회원 정보 관리</p>
                </div>

                <MemberDetail
                    memberId={selectedMemberId}
                    onBack={handleBackMember}
                    onMemberChanged={getMembers}
                />
            </div>
        );
    }

    // 게시글 상세
    if (selectedArticleId !== null) {
        return (
            <div className="container">
                <div className="header">
                    <h1>Member Article</h1>
                    <p>게시글 관리</p>
                </div>

                <ArticleDetail
                    articleId={selectedArticleId}
                    onBack={handleBackArticle}
                    onArticleChanged={handleArticleChanged}
                />
            </div>
        );
    }

    // 메인
    return (
        <div className="container">

            <div className="header">
                <h1>Member Article</h1>
            </div>

            <MemberForm
                onMemberCreated={getMembers}
            />

            <MemberList
                onSelectMember={handleSelectMember}
            />

            <ArticleForm
                members={members}
                onArticleCreated={handleArticleChanged}
            />

            <ArticleList
                onSelectArticle={handleSelectArticle}
                refreshKey={articleRefreshKey}
            />

        </div>
    );
};

export default App;