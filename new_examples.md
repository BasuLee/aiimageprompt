# 刚刚！谷歌推出Nano Banana官方终极指南：六条保姆级权威提示教程，拿走不谢

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7n0BiaCxwDgz7pK0jGtP5FZxFsRjicAwtUfPYlj3LZxY549dic25aAsw49g/640?wx_fmt=jpeg&from=appmsg#imgIndex=0)

  

直接和官方学习最顶级的nano banana 提示技巧，这比你看多少碎片文章和视频都强

Nano Banana 太火了，谷歌趁热打铁，刚刚推出了官方认证的的Nano Banana使用指南，指南一共有六条提示词模板和具体示例，可以在 Google AI Studio (ai.studio/banana) 中立即体验这些功能，或通过官方文档中的代码进行调用

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ICgnAptln0XaZmUMfuvKJcMGJurQBh7nlQBNyC1bM5H4h5ib3V6LHLqJdibdMLga1affrvCQDzs8wCdEfILwy77Q/640?wx_fmt=png&from=appmsg#imgIndex=1)

不熟悉的同学可以速览一下Nano Banana（即 Gemini 2.5 Flash Image 图像模型） 的核心功能：

**文生图 (Text-to-image):** 从简单或复杂的文本描述中生成高质量图像

**图+文生图 (编辑):** 提供一张图片，通过文本指令添加、移除或修改元素，改变风格或调整色彩

**多图生图 (合成与风格迁移):** 使用多张输入图像来构图新场景，或将一张图像的风格迁移到另一张上

**迭代优化:** 通过多轮对话逐步优化图像，进行微调直至完美

**文字渲染:** 生成包含清晰、位置得当文字的图像，非常适合用于徽标、图表和海报

本指南将教会你如何编写有效的提示词 (prompt) 和指令，以充分发挥 nano banana 的潜力。这一切都始于一个基本原则：

> 描述场景，而非罗列关键词，nano banana 的核心优势在于其深度的语言理解能力。与一堆零散的关键词相比，一段叙事性的、富有描述力的段落几乎总能生成更优质、更连贯的图像

  

废话不多说，直接上干货

# Nano Banana 六大提示词技巧

### 1\. 创造照片级真实感场景

想要获得逼真的图像，要像摄影师一样思考。提及相机角度、镜头类型、光线和精致细节，将引导模型创造出照片级的效果

**模板 :**

一张照片级的\[拍摄类型\]照片，主体是\[主体\]，正在\[动作或表情\]，场景位于\[环境\]。由\[光线描述\]照亮，营造出\[氛围\]的氛围。使用\[相机/镜头细节\]拍摄，突出了\[关键纹理和细节\]。图像应为\[宽高比\]格式

A photorealistic \[shot type\] of \[subject\], \[action or expression\], set in \[environment\]. The scene is illuminated by \[lighting description\], creating a \[mood\] atmosphere. Captured with a \[camera/lens details\], emphasizing \[key textures and details\]. The image should be in a \[aspect ratio\] format.

**示例提示词:**

一张照片级的特写肖像，主角是一位年迈的日本陶艺家，他脸上布满被阳光雕刻出的深深皱纹，带着温暖而会意的微笑。他正在仔细端详一个刚上釉的茶碗。背景是他那间充满阳光的乡村风格工作室。柔和的金色黄昏光线从窗户射入，照亮了黏土的细腻纹理。使用 85mm 人像镜头拍摄，背景柔和模糊（焦外成像）。整体氛围宁静而充满大师风范。竖向构图

A photorealistic close-up portrait of an elderly Japanese ceramicist with deep, sun-etched wrinkles and a warm, knowing smile. He is carefully inspecting a freshly glazed tea bowl. The setting is his rustic, sun-drenched workshop. The scene is illuminated by soft, golden hour light streaming through a window, highlighting the fine texture of the clay. Captured with an 85mm portrait lens, resulting in a soft, blurred background (bokeh). The overall mood is serene and masterful. Vertical portrait orientation.

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7nWHZF1c7tsmFDahTKd1kDt9liaN9vFicZfR4ia39zNIiaasSGn23h0JPWLA/640?wx_fmt=jpeg&from=appmsg#imgIndex=2)

**代码调用：**

```

from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Generate an image from a text prompt
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents="A photorealistic close-up portrait of an elderly Japanese ceramicist with deep, sun-etched wrinkles and a warm, knowing smile. He is carefully inspecting a freshly glazed tea bowl. The setting is his rustic, sun-drenched workshop with pottery wheels and shelves of clay pots in the background. The scene is illuminated by soft, golden hour light streaming through a window, highlighting the fine texture of the clay and the fabric of his apron. Captured with an 85mm portrait lens, resulting in a soft, blurred background (bokeh). The overall mood is serene and masterful.",
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]

if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('photorealistic_example.png')
    image.show()
```

### 2\. 风格化插图与贴纸

要为项目创建贴纸、图标或设计素材，请明确说明所需的风格，并记得在需要时要求使用白色背景

**模板 :**

一张\[风格\]风格的贴纸，主体是\[主体\]，具有\[关键特征\]和\[调色板\]。设计应采用\[线条风格\]和\[阴影风格\]。背景必须为白色

A \[style\] sticker of a \[subject\], featuring \[key characteristics\] and a \[color palette\]. The design should have \[line style\] and \[shading style\]. The background must be white.

**示例提示词 :**

一张卡哇伊风格的贴纸，画的是一只快乐的小熊猫，戴着一顶小小的竹帽，正在咀嚼一片绿色的竹叶。设计采用粗大、清晰的轮廓线，赛璐璐风格的简单着色，以及鲜艳的调色板。背景必须为白色

A kawaii-style sticker of a happy red panda wearing a tiny bamboo hat. It's munching on a green bamboo leaf. The design features bold, clean outlines, simple cel-shading, and a vibrant color palette. The background must be white

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7nM6iaA9uH5Y7gbw242MOgJVkuzic9t5g35tDzDb8cic0MxWZZawUdibyBAQ/640?wx_fmt=jpeg&from=appmsg#imgIndex=3)

**代码调用：**

```

from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Generate an image from a text prompt
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents="A kawaii-style sticker of a happy red panda wearing a tiny bamboo hat. It's munching on a green bamboo leaf. The design features bold, clean outlines, simple cel-shading, and a vibrant color palette. The background must be white.",
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]

if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('red_panda_sticker.png')
    image.show()
```

### 3\. 在图像中精准渲染文字

Gemini 非常擅长渲染文字。在提示词中清晰地写出文本内容、描述字体风格以及整体设计。

**模板 :**

为\[品牌/概念\]创建一个\[图像类型\]，包含文字“\[要渲染的文本\]”，字体为\[字体风格\]。整体设计应为\[风格描述\]，配色方案为\[配色方案\]

Create a \[image type\] for \[brand/concept\] with the text "\[text to render\]" in a \[font style\]. The design should be \[style description\], with a \[color scheme\].

**示例提示词 :**

为一家名为“The Daily Grind”的咖啡店设计一个现代、极简的标志。文字应采用干净、粗体的无衬线字体。设计中包含一个与文字无缝融合的、简约风格化的咖啡豆图标。配色方案为黑白。

Create a modern, minimalist logo for a coffee shop called 'The Daily Grind'. The text should be in a clean, bold, sans-serif font. The design should feature a simple, stylized icon of a coffee bean seamlessly integrated with the text. The color scheme is black and white

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7nDhE9TiazSm5Dk1uQX7ibT99M0SsOmT964qo7FoAeOYGnKZWB9Y6Yy4FQ/640?wx_fmt=jpeg&from=appmsg#imgIndex=4)

**代码调用：**

```
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Generate an image from a text prompt
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents="Create a modern, minimalist logo for a coffee shop called 'The Daily Grind'. The text should be in a clean, bold, sans-serif font. The design should feature a simple, stylized icon of a a coffee bean seamlessly integrated with the text. The color scheme is black and white.",
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]

if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('logo_example.png')
    image.show()
```

### 4\. 产品模型图与商业摄影

为电子商务、广告或品牌创建干净、专业的产品照片

**模板 :**

一张高分辨率、影棚光拍摄的产品照片，主体是\[产品描述\]，放置在\[背景表面/描述\]上。灯光采用\[布光设置，如三点式柔光箱\]，以实现\[灯光目的\]。相机角度为\[角度类型\]，以展示\[特定功能\]。效果超逼真，焦点清晰地对准\[关键细节\]。\[宽高比\]

A high-resolution, studio-lit product photograph of a \[product description\] on a \[background surface/description\]. The lighting is a \[lighting setup, e.g., three-point softbox setup\] to \[lighting purpose\]. The camera angle is a \[angle type\] to showcase \[specific feature\]. Ultra-realistic, with sharp focus on \[key detail\]. \[Aspect ratio\].

**示例提示词 :**

一张高分辨率、影棚光拍摄的产品照片，主体是一个极简主义风格的哑光黑陶瓷咖啡杯，放在一个抛光的混凝土地面上。灯光采用三点式柔光箱设置，旨在创造柔和、漫射的高光并消除刺眼的阴影。相机采用略微俯视的45度角拍摄，以展示其简洁的线条。效果超逼真，焦点清晰地对准从咖啡中升起的热气。方形图像

A high-resolution, studio-lit product photograph of a minimalist ceramic coffee mug in matte black, presented on a polished concrete surface. The lighting is a three-point softbox setup designed to create soft, diffused highlights and eliminate harsh shadows. The camera angle is a slightly elevated 45-degree shot to showcase its clean lines. Ultra-realistic, with sharp focus on the steam rising from the coffee. Square image.

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7nBk4icMGmuhAmDepT9icic3ZuFRzgf3Keibd0GntFfxWc3mCbeXHfDicOBRw/640?wx_fmt=jpeg&from=appmsg#imgIndex=5)

**代码调用：**

```
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Generate an image from a text prompt
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents="A high-resolution, studio-lit product photograph of a minimalist ceramic coffee mug in matte black, presented on a polished concrete surface. The lighting is a three-point softbox setup designed to create soft, diffused highlights and eliminate harsh shadows. The camera angle is a slightly elevated 45-degree shot to showcase its clean lines. Ultra-realistic, with sharp focus on the steam rising from the coffee. Square image.",
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]

if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('product_mockup.png')
    image.show()
```

### 5\. 极简主义与留白设计

这种风格非常适合为网站、ppt或需要叠加文字的营销材料创建背景

**模板:**  
一幅极简主义构图，画面中只有一个\[主体\]，位于画面的\[右下角/左上角等位置\]。背景是一块巨大的、空白的\[颜色\]画布，创造出大量的留白空间。光线柔和而微妙。\[宽高比\]。

A minimalist composition featuring a single \[subject\] positioned in the \[bottom-right/top-left/etc.\] of the frame. The background is a vast, empty \[color\] canvas, creating significant negative space. Soft, subtle lighting. \[Aspect ratio\].

**示例提示词 :**

一幅极简主义构图，画面中只有一片精致的红色枫叶，位于画面的右下角。背景是一块巨大的、空白的米白色画布，为文字留下充足的留白空间。柔和的漫射光从左上方照来。方形图像。

A minimalist composition featuring a single, delicate red maple leaf positioned in the bottom-right of the frame. The background is a vast, empty off-white canvas, creating significant negative space for text. Soft, diffused lighting from the top left. Square image

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7noHanfwRI8NvUbLjDiaF8RdWYA7Cray1fpIoYzSdDyaEibuuY6Uyibu94A/640?wx_fmt=jpeg&from=appmsg#imgIndex=6)

  

```
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Generate an image from a text prompt
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents="A minimalist composition featuring a single, delicate red maple leaf positioned in the bottom-right of the frame. The background is a vast, empty off-white canvas, creating significant negative space for text. Soft, diffused lighting from the top left. Square image.",
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]

if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('minimalist_design.png')
    image.show()
```

### 6\. 连续艺术 (漫画/故事板)

通过清晰的场景描述，逐帧创建引人入胜的视觉叙事，非常适合制作故事板、连环画或任何形式的连续艺术

**模板 :**

一个\[艺术风格\]的单格漫画。前景是\[角色描述和动作\]。背景是\[场景细节\]。画格中有一个\[对话/标题框\]，文字是“\[文本\]”。光线营造出\[氛围\]的氛围。\[宽高比\]。

A single comic book panel in a \[art style\] style. In the foreground, \[character description and action\]. In the background, \[setting details\]. The panel has a \[dialogue/caption box\] with the text "\[Text\]". The lighting creates a \[mood\] mood. \[Aspect ratio\].

**示例提示词:**

一个单格漫画，采用粗粝的黑色电影艺术风格，配以高对比度的黑白墨水画。前景中，一名身穿风衣的侦探站在一盏闪烁的路灯下，雨水浸湿了他的肩膀。背景中，一家荒凉酒吧的霓虹灯招牌倒映在水坑里。顶部的标题框写着：“这座城市，秘密无处藏身。” 光线刺眼，营造出一种戏剧化而阴郁的氛围。横向构图。

A single comic book panel in a gritty, noir art style with high-contrast black and white inks. In the foreground, a detective in a trench coat stands under a flickering streetlamp, rain soaking his shoulders. In the background, the neon sign of a desolate bar reflects in a puddle. A caption box at the top reads "The city was a tough place to keep secrets." The lighting is harsh, creating a dramatic, somber mood. Landscape.

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0XaZmUMfuvKJcMGJurQBh7nOCjDIN7icrGN1y5QQ49oHqndHYtoQJ46XicDevDQxJZBhMrSJGDNa7LQ/640?wx_fmt=jpeg&from=appmsg#imgIndex=7)

  

```
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()

# Generate an image from a text prompt
response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents="A single comic book panel in a gritty, noir art style with high-contrast black and white inks. In the foreground, a detective in a trench coat stands under a flickering streetlamp, rain soaking his shoulders. In the background, the neon sign of a desolate bar reflects in a puddle. A caption box at the top reads \"The city was a tough place to keep secrets.\" The lighting is harsh, creating a dramatic, somber mood. Landscape.",
)

image_parts = [
    part.inline_data.data
    for part in response.candidates[0].content.parts
    if part.inline_data
]

if image_parts:
    image = Image.open(BytesIO(image_parts[0]))
    image.save('comic_panel.png')
    image.show()
```

参考：

https://x.com/googleaistudio/status/1962957615262224511