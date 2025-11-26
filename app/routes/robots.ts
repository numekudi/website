const content = `User-agent: *
Disallow:
`;

export const loader = async () => {
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
