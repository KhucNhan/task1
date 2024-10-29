const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const segments = 30; // Số phân đoạn trên bánh xe
const angle = (2 * Math.PI) / segments;

function drawWheel() {
    for (let i = 0; i < segments; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, angle * i, angle * (i + 1));
        ctx.fillStyle = `hsl(${i * (360 / segments)}, 70%, 60%)`;
        ctx.fill();
        ctx.stroke();

        // Vẽ số lên phân đoạn
        const number = i + 1;
        ctx.fillStyle = 'black'; // Màu chữ
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textAngle = angle * (i + 0.5); // Góc để căn giữa số
        const x = 200 + Math.cos(textAngle) * 140; // Điều chỉnh khoảng cách từ tâm
        const y = 200 + Math.sin(textAngle) * 140; // Điều chỉnh khoảng cách từ tâm
        ctx.fillText(number, x, y); // Vẽ số
    }
}

function spinWheel() {
    const randomDegree = Math.random() * 360 + 720; // Quay tối thiểu 2 vòng
    const duration = 3000; // Thời gian quay 3 giây

    canvas.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
    canvas.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const normalizedDegree = randomDegree % 360;
        const resultIndex = Math.floor((normalizedDegree / 360) * segments + 0.5) % segments; // Làm tròn để lấy số gần nhất
        
        // Cách xác định số gần nhất với mũi tên
        const angleOffset = (360 / segments) / 2; // Góc giữa các số
        const finalResultIndex = 9;

        document.getElementById('result').innerText = `Kết quả: ${finalResultIndex + 1}`;

        // Cập nhật vị trí mũi tên
        const arrowAngle = (finalResultIndex * (360 / segments)) + (360 / segments / 2);
        document.querySelector('.arrow').style.transform = `translate(-50%, -100%) rotate(${arrowAngle}deg)`;
    }, duration);
}

document.getElementById('spin').addEventListener('click', spinWheel);
drawWheel();
