function Solution({ result }) {
    if (!result) {
        return null;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
            <h3> Solution </h3>
            <p> <strong> Iterations: </strong> {result.iterations || 0} </p>
            <p> <strong> Root (x):   </strong> {result.root?.toFixed(6) || 'N/A'} </p>
        </div>
    );
}

export default Solution;