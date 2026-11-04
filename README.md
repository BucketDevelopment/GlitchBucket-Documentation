<p align="center">
<a href="https://bot.tudubucket.dev"><img src="https://cdn.tudubucket.dev/widebucket-rounded.png" width="100%" alt="GlitchBucket"></a>
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
Đây là mã nguồn của [bot.tudubucket.dev](https://bot.tudubucket.dev), bao gồm trang giới thiệu và tài liệu hướng dẫn sử dụng [GlitchBucket](https://discord.com/application-directory/1103932552701550622). Trang được làm bằng [Astro Starlight](https://starlight.astro.build).

Nội dung tài liệu nằm trong `web/content/docs`, còn trang giới thiệu nằm trong `web/pages`.

## 🍞 Chạy thử trên máy

```bash
npm ci
npm run dev
```

Trước khi tạo Pull Request, bạn nên chạy thử `npm run build` để chắc chắn trang build được.

## 🌸 Đóng góp

Nếu bạn thấy tài liệu bị sai, thiếu, hoặc muốn viết thêm, hãy tạo Pull Request. Pull Request sẽ được duyệt và phải build thành công thì mới được merge, sau đó trang sẽ tự cập nhật.

Khi viết tài liệu, bạn cần lưu ý:
- Tên lệnh, tham số và cách hoạt động phải đúng với bot đang chạy.
- Ảnh và video để trong `web/content/docs/docs/assets`, và đừng để dung lượng quá lớn.
- Không đưa token, ID nội bộ hay thông tin cá nhân vào ví dụ.
