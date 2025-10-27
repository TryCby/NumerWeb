function ComingSoon({ methodName }) {
    return (
        <div style={{
            margin: '32px auto',                        // กำหนดระยะห่างด้านบนและล่าง แล้วจัดให้อยู่กึ่งกลางแนวนอน
            padding: '20px',                            // กำหนดระยะห่างภายในกล่อง
            backgroundColor: '#ced6ffff',             // สีพื้นหลังของกล่อง
            textAlign: 'center'                         // จัดข้อความภายในกล่องให้อยู่ตรงกลางแนวนอน
        }}>
            <h3> Coming Soon </h3>                     
            <p> <strong> {methodName} </strong> </p>    
        </div>
    );
}

export default ComingSoon;