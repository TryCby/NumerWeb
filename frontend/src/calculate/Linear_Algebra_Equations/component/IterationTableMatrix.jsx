// src/calculate/Linear_Algebra_Equations/component/IterationTableMatrix.jsx

function IterationTableMatrix({ history, n }) {
    if (!history || history.length === 0) return null;

    const styles = {
        container: {
            marginBottom: '20px',
            overflowX: 'auto',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '15px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #ddd',
        },
        th: {
            backgroundColor: '#f2f2f2',
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        td: {
            padding: '10px',
            border: '1px solid #ddd',
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Iteration History</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Iteration</th>
                        {Array.from({ length: n }, (_, i) => (
                            <>
                                <th key={`x${i}`} style={styles.th}>x{i + 1}</th>
                                <th key={`e${i}`} style={styles.th}>ε{i + 1}</th>
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {history.map((row, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{row.iteration}</td>
                            {row.x.map((val, i) => (
                                <>
                                    <td key={`x${i}`} style={styles.td}>
                                        {val.toFixed(6)}
                                    </td>
                                    <td key={`e${i}`} style={styles.td}>
                                        {row.errors && row.errors[i] 
                                            ? row.errors[i].toFixed(6)
                                            : '-'}
                                    </td>
                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default IterationTableMatrix;