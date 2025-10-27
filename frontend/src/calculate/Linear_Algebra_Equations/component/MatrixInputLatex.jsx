// src/calculate/Linear_Algebra_Equations/component/MatrixInputLatex.jsx

function MatrixInputLatex({ size, matrixA, matrixB, onMatrixAChange, onMatrixBChange }) {
    return (
        <div style={{ 
            marginBottom: '20px', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px',
            backgroundColor: 'white'
        }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Matrix Input</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                {/* Matrix A */}
                <div>
                    <label style={{ 
                        fontWeight: 'bold', 
                        marginBottom: '8px', 
                        display: 'block',
                        color: '#495057'
                    }}>
                        Matrix [A]
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {matrixA.map((row, i) => (
                            <div key={i} style={{ display: 'flex', gap: '5px' }}>
                                {row.map((val, j) => (
                                    <input
                                        key={j}
                                        type="number"
                                        value={val}
                                        onChange={(e) => onMatrixAChange(i, j, parseFloat(e.target.value) || 0)}
                                        style={{
                                            width: '70px',
                                            padding: '10px',
                                            fontSize: '14px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            textAlign: 'center'
                                        }}
                                        step="any"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vector B */}
                <div>
                    <label style={{ 
                        fontWeight: 'bold', 
                        marginBottom: '8px', 
                        display: 'block',
                        color: '#495057'
                    }}>
                        Vector {'{B}'}
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {matrixB.map((val, i) => (
                            <input
                                key={i}
                                type="number"
                                value={val}
                                onChange={(e) => onMatrixBChange(i, parseFloat(e.target.value) || 0)}
                                style={{
                                    width: '70px',
                                    padding: '10px',
                                    fontSize: '14px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    textAlign: 'center'
                                }}
                                step="any"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatrixInputLatex;