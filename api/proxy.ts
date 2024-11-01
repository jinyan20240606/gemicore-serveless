export const config = {
  runtime: "edge",
};

const targetUrl = "https://www.baidu.com"; // 请替换为你想要代理的目标API

export default async (req: Request, res: any, a) => {
  console.log(req, res, a, '8--------')
  try {
    // 构建请求选项
    const options = {
      method: req.method, // 转发请求方法
      headers: req.headers, // 转发请求头
      body: req.body ? JSON.stringify(req.body) : undefined, // 转发请求体
    };

    // 发送请求
    const response = await fetch(targetUrl, options);

    // 获取响应数据
    const responseData = await response.json();

    // 构建响应
    const proxyResponse = new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        ...response.headers,
      },
    });

    // 将响应返回给客户端
    return proxyResponse
  } catch (error) {
    console.error("Proxy request failed:", error);
    const errorResponse = new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return errorResponse;
  }
};