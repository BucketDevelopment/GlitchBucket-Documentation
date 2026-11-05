---
title: Các câu hỏi thường gặp
description: Các câu hỏi thường gặp của GlitchBucket cũng như dành cho nhiều bot khác
---

## Mình có thể thêm bot vào máy chủ ở đâu?
Bạn có thể thêm bot vào máy chủ của bạn [tại đây](https://tudubucket.dev/application)

## Mình đã thêm bot vào máy chủ, nhưng không có lệnh nào hiện lên cả!
Điều này là do [Discord giới hạn một máy chủ (server) chỉ có thể có tối đa **50 bot đầu tiên được thêm vào (có sử dụng Slash Command) được hiển thị lệnh**](https://github.com/discord/discord-api-docs/discussions/4883).

Có nghĩa rằng, nếu trước đó đã có 50 bot khác sử dụng Slash Command, thì khi GlitchBucket được thêm vào máy chủ của bạn, bot sẽ không thể cập nhật lệnh cho bạn sử dụng được.

Để khắc phục vấn đề trên, bạn cần **sắp xếp lại trật tự thêm bot** (xóa bot khác đã được thêm trước đó, rồi thêm lại), khi đó GlitchBucket sẽ hiển thị lệnh cho bạn.

## Một số tính năng của bot không thực sự hoạt động!

Đầu tiên, bạn cần kiểm tra **quyền của bot** trước. 

Ví dụ như [Sticky Message](/commands/group/stickie) sẽ yêu cầu quyền `Gửi tin nhắn` & `Gửi Embed`.

Tùy theo các tính năng mà bot sẽ yêu cầu các quyền riêng. Các quyền cần cấp sẽ được yêu cầu khi bạn thực hiện lệnh của tính năng đó.


Tiếp theo, nếu tính năng đó liên quan tới **cấp bậc vai trò** (role của bot thấp hơn các role cần quản lí, như [Custom Role](/commands/group/customrole) sẽ yêu cầu quyền `Quản lí Role` và bot phải có role cao hơn các role cần quản lí), thì bot sẽ không thể thực hiện quản lí các role đó. Những điều dưới đây sẽ xảy ra:

- Bot tự động hủy tác vụ (nếu như nó thuộc tác vụ tự động)
- Bot sẽ thông báo lại cho bạn, rằng đây không phải là lỗi mà là do bạn sắp xếp role chưa đúng (nếu bạn dùng lệnh)

Để khắc phục vấn đề trên, bạn cần cho GlitchBucket có role cao hơn các role cần quản lí. 


Ngoài ra, bot có thể gặp một số lỗi không mong muốn (như lỗi cập nhật cơ sở dữ liệu, hoặc lỗ hổng chưa được khai thác).

Để khắc phục vấn đề trên, bạn có thể:
- Sử dụng lại lệnh
- Tham gia [Discord](https://tudubucket.dev/discord) để được nhận hỗ trợ!

## Mình muốn chỉnh từng quyền cho từng lệnh...
Discord có tính năng dành riêng cho Slash Command, giúp bạn quản lí lệnh một cách trực quan hơn. Điều này bao gồm:
- Giới hạn người dùng có thể sử dụng, theo lệnh
- Tắt/Bật lệnh
- Cho bạn một góc nhìn tổng quát về các lệnh của bot

Để thay đổi cài đặt trên, bạn có thể vào:
- Tiếng Việt: *Cài đặt máy chủ* `>` *Ứng dụng* `>` *Tích hợp* `>` *GlitchBucket*
- Tiếng Anh: *Server Setting* `>` *Apps* `>` *Intergrations* `>` *GlitchBucket*


