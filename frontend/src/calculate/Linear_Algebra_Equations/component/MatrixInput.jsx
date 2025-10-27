// src/calculate/Linear_Algebra_Equations/component/MatrixInput.jsx
import { useState } from 'react';

function MatrixInput({ 
    n, 
    onNChange, 
    matrixA, 
    matrixB, 
    onMatrixChange, 
    onCalculate, 
    showInitialX = false, 
    initialX, 
    onInitialXChange,
    showTolerance = false,
    tolerance,
    onToleranceChange
}) {
    const styles = {
        container: {
            padding: '20px',
            border: '1px solid #ccc',
            marginBottom: '20px',
        },
        inputGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '16px',
        },
        input: {
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '150px',
        },
        matrixContainer: {
            display: 'flex',
            gap: '20px',
            alignItems: 'flex-start',
            marginBottom: '15px',
        },
        matrixSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
        },
        matrixRow: {
            display: 'flex',
            gap: '5px',
        },
        matrixInput: {
            width: '60px',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textAlign: 'center',
        },
        vectorInput: {
            width: '60px',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textAlign: 'center',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#000dff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
        }
    };

    const handleMatrixAChange = (i, j, value) => {
        const newMatrix = matrixA.map(row => [...row]);
        newMatrix[i][j] = value;
        onMatrixChange('A', newMatrix);
    };

    const handleMatrixBChange = (i, value) => {
        const newVector = [...matrixB];
        newVector[i] = value;
        onMatrixChange('B', newVector);
    };

    const handleInitialXChange = (i, value) => {
        const newVector = [...initialX];
        newVector[i] = value;
        onInitialXChange(newVector);
    };

    const validateInputs = () => {
        if (n < 2 || n > 10) {
            alert('Matrix size must be between 2 and 10');
            return false;
        }

        // Check if matrix A has any empty cells
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrixA[i][j] === '' || isNaN(parseFloat(matrixA[i][j]))) {
                    alert(`Please fill all values in Matrix A`);
                    return false;
                }
            }
        }

        // Check if vector B has any empty cells
        for (let i = 0; i < n; i++) {
            if (matrixB[i] === '' || isNaN(parseFloat(matrixB[i]))) {
                alert(`Please fill all values in Vector B`);
                return false;
            }
        }

        // Check initial X if required
        if (showInitialX) {
            for (let i = 0; i < n; i++) {
                if (initialX[i] === '' || isNaN(parseFloat(initialX[i]))) {
                    alert(`Please fill all values in Initial X`);
                    return false;
                }
            }
        }

        // Check tolerance if required
        if (showTolerance) {
            const tol = parseFloat(tolerance);
            if (isNaN(tol) || tol <= 0) {
                alert('Please enter a valid tolerance value (must be > 0)');
                return false;
            }
        }

        return true;
    };

    const handleCalculateClick = () => {
        if (validateInputs()) {
            onCalculate();
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Matrix Size (n×n):</label>
                <input
                    type="number"
                    min="2"
                    max="10"
                    value={n}
                    onChange={(e) => onNChange(parseInt(e.target.value) || 2)}
                    style={styles.input}
                />
                <span style={{ marginLeft: '10px', color: '#666' }}>(2-10)</span>
            </div>

            <div style={styles.matrixContainer}>
                {/* Matrix A */}
                <div style={styles.matrixSection}>
                    <label style={styles.label}>Matrix [A]</label>
                    {matrixA.map((row, i) => (
                        <div key={i} style={styles.matrixRow}>
                            {row.map((val, j) => (
                                <input
                                    key={j}
                                    type="number"
                                    value={val}
                                    onChange={(e) => handleMatrixAChange(i, j, e.target.value)}
                                    style={styles.matrixInput}
                                    placeholder="0"
                                    step="any"
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Vector B */}
                <div style={styles.matrixSection}>
                    <label style={styles.label}>Vector {'{B}'}</label>
                    {matrixB.map((val, i) => (
                        <div key={i} style={styles.matrixRow}>
                            <input
                                type="number"
                                value={val}
                                onChange={(e) => handleMatrixBChange(i, e.target.value)}
                                style={styles.vectorInput}
                                placeholder="0"
                                step="any"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Initial X for iterative methods */}
            {showInitialX && (
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Initial X (X₀):</label>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                        {initialX.map((val, i) => (
                            <input
                                key={i}
                                type="number"
                                value={val}
                                onChange={(e) => handleInitialXChange(i, e.target.value)}
                                style={styles.matrixInput}
                                placeholder="0"
                                step="any"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Tolerance input */}
            {showTolerance && (
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Error Tolerance (ε):</label>
                    <input
                        type="number"
                        value={tolerance}
                        onChange={(e) => onToleranceChange(e.target.value)}
                        style={styles.input}
                        placeholder="0.000001"
                        step="any"
                        min="0"
                    />
                    <span style={{ marginLeft: '10px', color: '#666', fontSize: '14px' }}>
                        (Default: 0.000001 or 1e-6)
                    </span>
                </div>
            )}

            <button 
                onClick={handleCalculateClick} 
                style={styles.button}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0008cc'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#000dff'}
            >
                Calculate
            </button>
        </div>
    );
}

export default MatrixInput;