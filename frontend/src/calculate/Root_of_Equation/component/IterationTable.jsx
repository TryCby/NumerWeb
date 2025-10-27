function IterationTable({ history, methodType }) {
    if (!history || history.length === 0) return null;

    const renderTableHeaders = () => {
        switch (methodType) {
            case 'bisection':
            case 'falseposition':
                return (
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XM</th>
                        <th>XR</th>
                        <th>f(XM)</th>
                        <th>Error</th>
                    </tr>
                );
            case 'graphical':
                return (
                    <tr>
                        <th>Iteration</th>
                        <th>X</th>
                        <th>f(X)</th>
                        <th>Error</th>
                    </tr>
                );
            case 'onepoint':
            case 'newtonraphson':
                return (
                    <tr>
                        <th>Iteration</th>
                        <th>Xi</th>
                        <th>f(Xi)</th>
                        <th>Error</th>
                    </tr>
                );
            case 'secant':
                return (
                    <tr>
                        <th>Iteration</th>
                        <th>X0</th>
                        <th>X1</th>
                        <th>X2</th>
                        <th>f(X2)</th>
                        <th>Error</th>
                    </tr>
                );
            default:
                return null;
        }
    };

    const renderTableRows = () => {
        return history.map((row, index) => {
            switch (methodType) {
                case 'bisection':
                case 'falseposition':
                    return (
                        <tr key={index}>
                            <td>{row.iteration}</td>
                            <td>{row.xL?.toFixed(6)}</td>
                            <td>{row.xM?.toFixed(6)}</td>
                            <td>{row.xR?.toFixed(6)}</td>
                            <td>{row.fx?.toFixed(6)}</td>
                            <td>{row.error ? row.error.toFixed(8) : '-'}</td>
                        </tr>
                    );
                case 'graphical':
                    return (
                        <tr key={index}>
                            <td>{row.iteration}</td>
                            <td>{row.xL?.toFixed(6)}</td>
                            <td>{row.fxL?.toFixed(6)}</td>
                            <td>{row.error ? row.error.toFixed(8) : '-'}</td>
                        </tr>
                    );
                case 'onepoint':
                case 'newtonraphson':
                    return (
                        <tr key={index}>
                            <td>{row.iteration}</td>
                            <td>{row.xi?.toFixed(6)}</td>
                            <td>{row.fx?.toFixed(6)}</td>
                            <td>{row.error ? row.error.toFixed(8) : '-'}</td>
                        </tr>
                    );
                case 'secant':
                    return (
                        <tr key={index}>
                            <td>{row.iteration}</td>
                            <td>{row.x0?.toFixed(6)}</td>
                            <td>{row.x1?.toFixed(6)}</td>
                            <td>{row.x2?.toFixed(6)}</td>
                            <td>{row.fx?.toFixed(6)}</td>
                            <td>{row.error ? row.error.toFixed(8) : '-'}</td>
                        </tr>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
            <h3>Iteration History</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {renderTableHeaders()}
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
}

export default IterationTable;