import React, {useMemo} from "react";

function ExpensiveComponent({num}: { num: number }) {

    const computedValue = useMemo(() => {
        console.log('Expensive calculation running...');
        let result = 0;
        for (let i = 0; i < 1000000000; i++) {
            result += i * num;
        }
        return result;
    }, [num]);

    return (
        <div>Expensive value: {computedValue}</div>
    );
}

export default React.memo(ExpensiveComponent);