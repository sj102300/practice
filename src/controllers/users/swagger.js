export const getUserSwagger = {
    "/:id": {
        get: {
            tags: ["User"],
            summary: "유저를 상세 조회 합니다.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "number"
                    },
                },
            ],
            responses: {
                200: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "number",
                                            },
                                            age: {
                                                type: "number",
                                            },
                                            name: {
                                                type: "string",
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}