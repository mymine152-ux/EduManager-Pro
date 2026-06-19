var danhSachHocSinh = [];

var danhSachTaiKhoan = [];

var vaiTroHienTai = "";
var taiKhoanHienTai = "";

function luuHocSinhVaoMay() {
    var chuoiDuLieu = JSON.stringify(danhSachHocSinh);
    localStorage.setItem("KHO_HOC_SINH", chuoiDuLieu);
}

function layHocSinhTuMay() {
    var duLieu = localStorage.getItem("KHO_HOC_SINH");
    if (duLieu !== null) {
        danhSachHocSinh = JSON.parse(duLieu);
    }
}

function luuTaiKhoanVaoMay() {
    localStorage.setItem("KHO_TAI_KHOAN", JSON.stringify(danhSachTaiKhoan));
}

function layTaiKhoanTuMay() {
    var duLieu = localStorage.getItem("KHO_TAI_KHOAN");
    if (duLieu !== null) {
        danhSachTaiKhoan = JSON.parse(duLieu);
    } else {
        var taiKhoanMacDinh = { tenDangNhap: "admin", matKhau: "123", vaiTro: "giaovien" };
        danhSachTaiKhoan.push(taiKhoanMacDinh);
    }
}

function tinhDiemTB(diemToan, diemVan, diemAnh) {
    var tongDiem = diemToan + diemVan + diemAnh;
    var diemTrungBinh = tongDiem / 3;
    return diemTrungBinh.toFixed(1);
}

function xepLoaiHS(diemTB) {
    if (diemTB >= 8.0) {
        return "Giỏi";
    } else if (diemTB >= 6.5 && diemTB < 8.0) {
        return "Khá";
    } else if (diemTB >= 5.0 && diemTB < 6.5) {
        return "TrungBình";
    } else {
        return "Yếu";
    }
}


function xoaHocSinh(idXoa) {
    var xacNhan = confirm("Bạn có chắc chắn muốn xóa học sinh này không?");
    if (xacNhan === true) {
        danhSachHocSinh = danhSachHocSinh.filter(function (hs) {
            return hs.id !== idXoa;
        });
        luuHocSinhVaoMay();
        veLaiBang();
    }
}

function suaHocSinh(idSua) {
    var hsCungId = danhSachHocSinh.find(function (hs) {
        return hs.id === idSua;
    });

    if (hsCungId !== undefined) {
        document.getElementById("edit-id").value = hsCungId.id;
        document.getElementById("student-name").value = hsCungId.hoTen;
        document.getElementById("student-sbd").value = hsCungId.sbd || "";
        document.getElementById("student-dob").value = hsCungId.ngaySinh;
        document.getElementById("student-gender").value = hsCungId.gioiTinh;
        document.getElementById("math-score").value = hsCungId.toan;
        document.getElementById("lit-score").value = hsCungId.van;
        document.getElementById("eng-score").value = hsCungId.anh;

        document.getElementById("form-title").innerText = "Sửa Thông Tin Học Sinh";
    }
}

document.getElementById("student-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var idSua = document.getElementById("edit-id").value;

    var ten = document.getElementById("student-name").value;
    var sbd = document.getElementById("student-sbd").value;
    var dob = document.getElementById("student-dob").value;
    var gender = document.getElementById("student-gender").value;
    var toan = parseFloat(document.getElementById("math-score").value);
    var van = parseFloat(document.getElementById("lit-score").value);
    var anh = parseFloat(document.getElementById("eng-score").value);

    if (toan > 10 || toan < 0 || van > 10 || van < 0 || anh > 10 || anh < 0) {
        alert("❌ Lỗi: Điểm số chỉ được phép nhập từ 0 đến 10!");
        return;
    }

    if (idSua !== "") {
        var idCanSua = parseInt(idSua);
        var hs = danhSachHocSinh.find(function (h) { return h.id === idCanSua; });
        if (hs) {
            hs.hoTen = ten;
            hs.sbd = sbd;
            hs.ngaySinh = dob;
            hs.gioiTinh = gender;
            hs.toan = toan;
            hs.van = van;
            hs.anh = anh;
        }
    } else {
        var idMoi = 1;
        if (danhSachHocSinh.length > 0) {
            var nguoiCuoiCung = danhSachHocSinh[danhSachHocSinh.length - 1];
            idMoi = nguoiCuoiCung.id + 1;
        }

        var hocSinhMoi = {
            id: idMoi,
            hoTen: ten,
            sbd: sbd,
            ngaySinh: dob,
            gioiTinh: gender,
            toan: toan,
            van: van,
            anh: anh,
            email: "",
            sodt: "",
            diaChi: ""
        };

        danhSachHocSinh.push(hocSinhMoi);
    }

    luuHocSinhVaoMay();
    donDepForm();
    veLaiBang();
});

function donDepForm() {
    document.getElementById("student-form").reset();
    document.getElementById("edit-id").value = "";
    document.getElementById("form-title").innerText = "Thêm Học Sinh Mới";
}

function veLaiBang() {
    var theBang = document.getElementById("student-tbody");
    theBang.innerHTML = "";

    if (vaiTroHienTai === "hocsinh") {
        var hsHienTai = danhSachHocSinh.find(function (h) {
            return h.sbd && h.sbd.trim().toLowerCase() === taiKhoanHienTai.trim().toLowerCase();
        });

        if (hsHienTai) {
            document.getElementById("info-name").innerText = hsHienTai.hoTen;
            document.getElementById("info-sbd").innerText = hsHienTai.sbd || "";
            document.getElementById("info-dob").innerText = hsHienTai.ngaySinh;
            document.getElementById("info-gender").innerText = hsHienTai.gioiTinh;
            document.getElementById("info-email").innerText = hsHienTai.email || "Chưa cập nhật";
            document.getElementById("info-phone").innerText = hsHienTai.sodt || "Chưa cập nhật";
            document.getElementById("info-address").innerText = hsHienTai.diaChi || "Chưa cập nhật";

            document.getElementById("self-email").value = hsHienTai.email || "";
            document.getElementById("self-phone").value = hsHienTai.sodt || "";
            document.getElementById("self-address").value = hsHienTai.diaChi || "";
        } else {
            document.getElementById("info-name").innerText = "Chưa có dữ liệu từ Giáo Viên";
            document.getElementById("info-sbd").innerText = taiKhoanHienTai;
            document.getElementById("info-dob").innerText = "-";
            document.getElementById("info-gender").innerText = "-";
            document.getElementById("info-email").innerText = "-";
            document.getElementById("info-phone").innerText = "-";
            document.getElementById("info-address").innerText = "-";
        }
    }

    for (var i = 0; i < danhSachHocSinh.length; i++) {
        var hs = danhSachHocSinh[i];

        var laHocSinhHienTai = hs.sbd && hs.sbd.trim().toLowerCase() === taiKhoanHienTai.trim().toLowerCase();

        if (vaiTroHienTai === "hocsinh") {
            if (laHocSinhHienTai === false) {
                continue;
            }
        }

        var dtb = tinhDiemTB(hs.toan, hs.van, hs.anh);
        var loai = xepLoaiHS(dtb);

        var thongTinLienHe = "";
        if (hs.email || hs.sodt) {
            var emailStr = hs.email ? `📧 ${hs.email}` : "";
            var sodtStr = hs.sodt ? `📞 ${hs.sodt}` : "";
            var separator = (hs.email && hs.sodt) ? " | " : "";
            thongTinLienHe = `<br><small style="color: #0ea5e9; font-weight: 500;">${emailStr}${separator}${sodtStr}</small>`;
        }

        var btnStr = "";
        if (vaiTroHienTai === "giaovien") {
            btnStr = `<button onclick="suaHocSinh(${hs.id})" class="btn-edit" style="width:auto; padding:5px 10px">Sửa</button> 
                      <button onclick="xoaHocSinh(${hs.id})" class="btn-danger" style="width:auto; padding:5px 10px">Xóa</button>`;
        }

        var dongHtml = `<tr>
            <td><strong>${hs.hoTen}</strong><br><small style="color:#64748b">SBD: ${hs.sbd || ""}</small>${thongTinLienHe}</td>
            <td>${hs.toan}</td>
            <td>${hs.van}</td>
            <td>${hs.anh || 0}</td>
            <td><strong>${dtb}</strong></td>
            <td><span class="badge ${loai}">${loai}</span></td>`;

        if (vaiTroHienTai === "giaovien") {
            dongHtml += `<td>${btnStr}</td>`;
        }

        dongHtml += `</tr>`;

        theBang.innerHTML += dongHtml;
    }
}


function chuyenCheDo(laDangKy) {
    if (laDangKy === true) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
        document.getElementById("auth-title").innerText = "Đăng Ký Tài Khoản";
    } else {
        document.getElementById("login-form").style.display = "block";
        document.getElementById("register-form").style.display = "none";
        document.getElementById("auth-title").innerText = "Đăng Nhập";
    }
}

function xuLyDangKy() {
    var roleDangKy = document.getElementById("reg-role").value;
    var tk = document.getElementById("reg-username").value;
    var mk = document.getElementById("reg-password").value;

    if (mk.length < 6) {
        alert("Mật khẩu quá ngắn! Phải có ít nhất 6 ký tự.");
        return;
    }

    var daTonTai = false;
    for (var i = 0; i < danhSachTaiKhoan.length; i++) {
        var user = danhSachTaiKhoan[i];
        if (user.tenDangNhap.trim().toLowerCase() === tk.trim().toLowerCase()) {
            daTonTai = true;
            break;
        }
    }

    if (daTonTai === true) {
        alert("Tên đăng nhập đã tồn tại! Vui lòng chọn tên khác.");
        return;
    }

    var taiKhoanMoi = { tenDangNhap: tk, matKhau: mk, vaiTro: roleDangKy };
    danhSachTaiKhoan.push(taiKhoanMoi);

    luuTaiKhoanVaoMay();
    alert("Đăng ký thành công! Mời bạn đăng nhập.");
    chuyenCheDo(false);
}

function xuLyDangNhap() {
    var roleChon = document.getElementById("login-role").value;
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    var taiKhoanTimThay = null;
    for (var i = 0; i < danhSachTaiKhoan.length; i++) {
        var u = danhSachTaiKhoan[i];
        var trungTen = (u.tenDangNhap.trim().toLowerCase() === user.trim().toLowerCase());
        var trungMatKhau = (u.matKhau === pass);
        var trungVaiTro = (u.vaiTro === roleChon);

        if (trungTen && trungMatKhau && trungVaiTro) {
            taiKhoanTimThay = u;
            break;
        }
    }

    if (taiKhoanTimThay !== null) {
        vaiTroHienTai = taiKhoanTimThay.vaiTro;
        taiKhoanHienTai = taiKhoanTimThay.tenDangNhap;
        document.getElementById("login-overlay").style.display = "none";

        if (vaiTroHienTai === "hocsinh") {
            document.getElementById("form-section").style.display = "block";
            document.getElementById("teacher-form-container").style.display = "none";
            document.getElementById("student-form-container").style.display = "block";

            document.getElementById("cot-hanh-dong").style.display = "none";
            document.getElementById("student-info-card").style.display = "block";
        } else {
            document.getElementById("form-section").style.display = "block";
            document.getElementById("teacher-form-container").style.display = "block";
            document.getElementById("student-form-container").style.display = "none";

            document.getElementById("cot-hanh-dong").style.display = "table-cell";
            document.getElementById("student-info-card").style.display = "none";
        }

        veLaiBang();
    } else {
        alert("Đăng nhập thất bại! Kiểm tra lại tài khoản, mật khẩu hoặc CHỨC VỤ.");
    }
}


function xuLyCapNhatHocSinh() {
    var emailVal = document.getElementById("self-email").value.trim();
    var phoneVal = document.getElementById("self-phone").value.trim();
    var addressVal = document.getElementById("self-address").value.trim();

    var hsCuaToi = null;
    for (var i = 0; i < danhSachHocSinh.length; i++) {
        var h = danhSachHocSinh[i];
        if (h.sbd && h.sbd.trim().toLowerCase() === taiKhoanHienTai.trim().toLowerCase()) {
            hsCuaToi = h;
            break;
        }
    }

    if (hsCuaToi !== null) {
        hsCuaToi.email = emailVal;
        hsCuaToi.sodt = phoneVal;
        hsCuaToi.diaChi = addressVal;

        luuHocSinhVaoMay();
        veLaiBang();
        alert("🎉 Cập nhật thông tin cá nhân thành công!");
    } else {
        alert("❌ Lỗi: Không tìm thấy hồ sơ học sinh khớp với Số báo danh của tài khoản này. Vui lòng liên hệ giáo viên nhập điểm.");
    }
}

function dangXuat() {
    vaiTroHienTai = "";
    taiKhoanHienTai = "";
    document.getElementById("login-overlay").style.display = "flex";
    document.getElementById("login-form").reset();
    document.getElementById("student-self-form").reset();
    donDepForm();
}

window.onload = function () {
    layHocSinhTuMay();
    layTaiKhoanTuMay();
};
