function Header(){          // สร้าง Function Component ชื่อ Header
    const styles = {        // เขียน CSS แบบ inline
        h1: {               // กำหนด style ให้ Tag หัวข้อ
            color: "#000dff",             // สีตัวอักษร : น้ำเงิน
            textAlign: "center",            // จัดข้อความให้อยู่ตรงกลาง 
            fontSize: "50px",               // ขนาดตัวอักษร
            marginTop: "32px",              // ระยะห่างด้านบน
            marginBottom: "16px",           // ระยะห่างด้านล่าง
            fontWeight: 600,                // ความหนาของฟอนต์ (100 - 900)
        },
        divider: {          // กำหนด style ให้ Tag ตัวคั่น
            backgroundColor: "#000dff",   // สีพื้นหลัง : น้ำเงิน
            height: "5px",                  // ความสูง
            width: "400px",                 // ความกว้าง
            margin: "0px auto 32px auto",   // ระยะห่างภายนอก : บน ขวา ล่าง ซ้าย 
        }
    };

    return (
        <>
            <h1 style={styles.h1}> Numerical Methods </h1>    {/* หัวข้อหลักของหน้าที่แสดงชื่อเรื่อง "Numerical Methods" */}
            <hr style={styles.divider} />                     {/* เส้นแนวนอน ที่มีสไตล์จากคลาส CSS ชื่อ divider (ตัวคั่น) */}  
        </>
    );
}

export default Header;     