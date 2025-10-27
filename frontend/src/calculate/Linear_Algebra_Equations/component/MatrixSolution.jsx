// src/calculate/Linear_Algebra_Equations/component/MatrixSolution.jsx

function MatrixSolution({ result, methodType }) {
    if (!result) return null;

    const styles = {
        container: {
            padding: '20px',
            border: '1px solid #ccc',
            marginBottom: '20px',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
        },
        solutionRow: {
            marginBottom: '10px',
            fontSize: '16px',
        },
        label: {
            fontWeight: 'bold',
        }
    };

    const renderSolution = () => {
        if (!result.x) return null;

        return (
            <div>
                {result.x.map((val, i) => (
                    <div key={i} style={styles.solutionRow}>
                        <span style={styles.label}>x{i + 1} = </span>
                        <span>{val.toFixed(6)}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderIterations = () => {
        if (!result.history || result.history.length === 0) return null;

        return (
            <div style={styles.solutionRow}>
                <span style={styles.label}>Iterations: </span>
                <span>{result.history.length}</span>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Solution</h3>
            {renderIterations()}
            {renderSolution()}
        </div>
    );
}

export default MatrixSolution;