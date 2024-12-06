---
title: Thông tin hữu ích
description: Các thông tin hữu ích khi bạn sử dụng Discord
---

## Thời gian Discord
Thời gian Discord có thể rất hữu ích để xác định ngày/giờ theo múi giờ của nhiều người dùng khác nhau. Chúng hoạt động dựa trên định dạng Unix Timestamp và có thể được đăng bởi người dùng thông thường cũng như bot và ứng dụng.

[The Epoch Unix Time Stamp Converter](https://www.unixtimestamp.com/) là cách tốt để nhanh chóng tạo ra một timestamp. Đối với các ví dụ dưới đây, mình sẽ sử dụng Time Stamp là 1543392060, tương đương với ngày 28 tháng 11 năm 2018 lúc 15:01:00 giờ theo múi giờ của Việt Nam (GMT+0700).

|Kiểu|Đầu vào|Đầu ra (đồng hồ 12 giờ)|Đầu ra (đồng hồ 24 giờ)
|--|--|--|--
|Mặc định|`<t:1543392060>`|28 Tháng 11, 2018 15:01 SA|28 Tháng 11 2018 15:01
|Thời gian ngắn|`<t:1543392060:t>`|15:01 SA|15:01
|Thời gian dài|`<t:1543392060:T>`|15:01:00 SA|15:01:00
|Ngày ngắn|`<t:1543392060:d>`|11/28/2018|28/11/2018
|Ngày dài|`<t:1543392060:D>`|28 Tháng 11, 2018|28 Tháng 11 2018
|Ngày/Giờ ngắn|`<t:1543392060:f>`|28 Tháng 11, 2018 15:01 SA|28 Tháng 11 2018 15:01
|Ngày/Giờ dài|`<t:1543392060:F>`|Thứ Tư, 28 Tháng 11, 2018 15:01 SA|Thứ Tư, 28 Tháng 11 2018 15:01
|Thời gian tương đối|`<t:1543392060:R>`|6 năm trước|6 năm trước

Đầu ra 12 giờ hoặc 24 giờ phụ thuộc vào cài đặt ngôn ngữ Discord của bạn. Ví dụ, nếu bạn đã cài đặt ngôn ngữ Discord của mình là Tiếng Anh, Mỹ, bạn sẽ nhận được đầu ra 12 giờ. Nếu ngôn ngữ Discord của bạn là Tiếng Anh, Anh, bạn sẽ nhận được đầu ra 24 giờ. Ngôn ngữ Tiếng Việt sử dụng đồng hồ 24 giờ.

## Cách để tag một số ID

Chúng ta hãy gán:

- `user_id`: ID người dùng, ví dụ là `906844267870314577`
- `channel_id`: ID kênh, ví dụ là `1096028188976619523`
- `command_id`: ID lệnh slash, ví dụ là `1147727553373683752`

|Kiểu|Ví dụ|Đầu ra
|--|--|--
|`<@user_id>`|`<@906844267870314577>`|**@Ankita Tudubucket**
|`<#channel_id>`|`<#906844267870314577>`|**#general**
|`<id:customize>`|`<id:customize>`|Hướng tới phần Chọn kênh & vai trò (Channels & Roles)
|`<id:browse>`|`<id:browse>`|Hướng tới phần Chọn hiển thị các kênh
|`<id:guide>`|`<id:guide>`|Hướng tới phần Hướng dẫn Máy chủ (Server Guide)
|</command\:id>|`</artwork:1147727553373683752>`:n `</report recent:1192112079977582672>`|Đề cập tới 1 lênh slash (Bạn có thể bấm vào để trực tiếp sử dụng)

:::note[Note]
Bạn có thể thêm kí tự `\` ở đằng trước để chuyển từ kiểu **đã đề cập** sang loại kí tự bình thường.

Ví dụ, bạn có một emoji là `:emoji:`, bạn có thể thêm `\` như `\:emoji:` để biến nó trở thành `<:emoji:1176462510690414646>`.

Phương pháp này có thể sử dụng để lấy một số Emoji nguyên bản cho GlitchBucket, cũng như áp dụng cho mọi loại mention.
:::

Cách để format thời gian đã có ở bên trên.

Bạn có thể xem tất cả tại [Trang Tài liệu Discord Developer](https://discord.com/developers/docs/reference#message-formatting)