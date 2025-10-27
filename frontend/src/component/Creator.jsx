function Creator(){                         // สร้าง Function Component ชื่อ Header        
    const styles = {                        // เขียน CSS แบบ inline
        footer: {                               // กำหนด style ให้ Tag ส่วนท้าย
            padding: '100px 0px',                   // กำหนดระยะห่างด้านบน-ล่าง
            textAlign: 'center',                    // จัดข้อความให้อยู่กึ่งกลางแนวนอน
            fontSize: '20px',                       // ขนาดตัวอักษร
        },
        bold: {                                 // กำหนด style ให้ Tag ข้อความตัวหนา
            fontWeight: '600',                      // ตัวอักษรหนา (100 - 900)
            color: '#000dff'                      // สีตัวอักษร : สีน้ำเงินเข้ม
        }
    };

    return (
        <footer style={styles.footer}>        {/* footer คือ Tag แสดงส่วนท้ายของหน้าเว็บ */}
            <p>                               {/* p คือ Tag ย่อหน้าแสดงข้อความ */}
                Created by <b style={styles.bold}> 6704062611069 Teerayoth Chanbanyong </b>
            </p>                              {/* b คือ Tag ข้อความตัวหนา */}
        </footer>
    );
}

export default Creator;