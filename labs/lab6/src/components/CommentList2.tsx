import React from "react";

// TESTING ONLY

interface CommentListProps {
    currentUser: any, // object <- error
}

/*
Benefits of React.FC:
Children Prop Automatically Included: If your component needs to render children, the React.FC type automatically types that prop for you.
Type Inference for JSX Return: You don’t need to explicitly state that your component returns JSX.Element—TypeScript knows that from the React.FC type.

Drawbacks of React.FC:
children prop is always included: Even if your component doesn’t use or need children, React.FC adds it, which could lead to bugs or confusion. You can override this, but it’s a small hassle.
Less explicit: You lose some flexibility in managing your own props, as React.FC brings certain default behaviors that you might not always need.
No default props typing: TypeScript doesn’t fully support default prop inference when using React.FC, so setting default props can be trickier.
* */
// BUT I couldn't see its benefits.

const CommentList2: React.FC<CommentListProps> = (props) => {
    // return <>{props.children}</>; // error
    return null;
};

export default CommentList2;
