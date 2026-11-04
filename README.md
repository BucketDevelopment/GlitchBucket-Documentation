<p align="center">
<a href="https://bot.tudubucket.dev"><img src="https://cdn.langdua.net/104169263_p1.png" height="auto" width="180" style="border-radius:50%"></a>
</p>

<h1 align="center">GlitchBucket Documentation</h1>
<p align="center">Tài liệu và trang giới thiệu của GlitchBucket.</p>

<div align="center">
    <a href="https://discord.gg/Yq6TT6bjX7"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=f5f5f5" alt="Discord"/></a>
    <a href="https://tudubucket.dev/application"><img src="https://img.shields.io/badge/Add_GlitchBucket-C0CDFF?style=for-the-badge&logo=robotframework&logoColor=gray" alt="Add Bot"/></a>
    <a href="https://bot.tudubucket.dev/docs"><img src="https://img.shields.io/badge/Docs-C0CDFF?style=for-the-badge&logo=astro&logoColor=gray" alt="Docs"/></a>
    <br>
    <img src="https://img.shields.io/github/last-commit/BucketDevelopment/GlitchBucket-Documentation?style=for-the-badge" alt="GitHub last commit"/>
    <img src="https://img.shields.io/github/commit-activity/w/BucketDevelopment/GlitchBucket-Documentation?style=for-the-badge" alt="GitHub commit activity"/>
    <img src="https://img.shields.io/github/commit-activity/t/BucketDevelopment/GlitchBucket-Documentation?style=for-the-badge" alt="GitHub commit activity"/>
    <br>
</div>

## 🌺 Giới thiệu
Repo này chứa mã nguồn của [bot.tudubucket.dev](https://bot.tudubucket.dev): trang giới thiệu và tài liệu sử dụng [GlitchBucket](https://discord.com/application-directory/1103932552701550622), xây dựng bằng [Astro Starlight](https://starlight.astro.build).

| Thư mục | Nội dung |
| --- | --- |
| `web/content/docs` | Nội dung tài liệu (`.md`, `.mdx`) |
| `web/pages` | Trang giới thiệu |
| `web/assets`, `public` | Hình ảnh, video, sitemap |

## 🍞 Chạy trên máy

```bash
npm ci
npm run dev
```

Kiểm tra trước khi tạo Pull Request:

```bash
npm run build
```

## 🌸 Đóng góp

Tạo Pull Request để sửa hoặc thêm tài liệu. PR cần được duyệt và build thành công trước khi merge. Sau khi merge, trang sẽ tự cập nhật.

Khi viết tài liệu, hãy đảm bảo:
- Tên lệnh, tham số và hành vi khớp với bot đang chạy.
- Ảnh và video đặt trong `web/content/docs/docs/assets`, dung lượng vừa phải.
- Không đưa token, ID nội bộ hoặc thông tin cá nhân vào ví dụ.
