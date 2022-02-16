let levels = {
    1: {
        rotation: false,
        timer: false,
        standardPieces: 8,
        tntPieces: 3,
        startGrid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        shapes: [
            [
                ["X"]
            ],
            [
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X", "X"],
                ["X", "X"]
            ],
            [
                ["X", "X", "X"],
                ["X", "X", "X"],
                ["X", "X", "X"]
            ],
            [
                ["X", 0],
                ["X", "X"]
            ],
            [
                ["X", 0, 0],
                ["X", 0, 0],
                ["X","X","X"]
            ],
            [
                [300]
            ],
            [
                [300,302],
                [303,301]
            ],
            [
                [301,302,300],
                [302,300,303],
                [300,303,301]
            ]
        ]
    },
    2: {
        rotation: true,
        timer: false,
        standardPieces: 14,
        tntPieces: 3,
        startGrid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        shapes: [
            [
                ["X"]
            ],
            [
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X", "X"],
                ["X", "X"]
            ],
            [
                ["X", "X", "X"],
                ["X", "X", "X"],
                ["X", "X", "X"]
            ],
            [
                ["X", 0],
                ["X", "X"]
            ],
            [
                ["X", 0, 0],
                ["X", 0, 0],
                ["X","X","X"]
            ],
            [
                ["X", "X", 0],
                [0, "X", 0],
                [0, "X", "X"]
            ],
            [
                ["X", 0, "X"],
                ["X", 0, "X"],
                ["X", "X", "X"],
            ],
            [
                ["X", 0, "X"],
                ["X", "X", "X"],
            ],
            [
                ["X", 0, 0, "X"],
                ["X", "X", "X", "X"],
            ],
            [
                [0, "X", "X"],
                [0, "X", 0],
                ["X", "X", 0],
            ],
            [
                ["X", "X", "X"],
                [0, "X", 0],
                [0, "X", 0],
            ],
            [
                [300]
            ],
            [
                [300,302],
                [303,301]
            ],
            [
                [301,302,300],
                [302,300,303],
                [300,303,301]
            ]
        ]
    },
    3: {
        rotation: false,
        timer: 180,
        standardPieces: 8,
        tntPieces: 3,
        startGrid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        shapes: [
            [
                ["X"]
            ],
            [
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X", "X"],
                ["X", "X"]
            ],
            [
                ["X", "X", "X"],
                ["X", "X", "X"],
                ["X", "X", "X"]
            ],
            [
                ["X", 0],
                ["X", "X"]
            ],
            [
                ["X", 0, 0],
                ["X", 0, 0],
                ["X","X","X"]
            ],
            [
                [300]
            ],
            [
                [300,302],
                [303,301]
            ],
            [
                [301,302,300],
                [302,300,303],
                [300,303,301]
            ]
        ]
    },
    4: {
        rotation: true,
        timer: 180,
        standardPieces: 14,
        tntPieces: 3,
        startGrid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        shapes: [
            [
                ["X"]
            ],
            [
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X", "X"],
                ["X", "X"]
            ],
            [
                ["X", "X", "X"],
                ["X", "X", "X"],
                ["X", "X", "X"]
            ],
            [
                ["X", 0],
                ["X", "X"]
            ],
            [
                ["X", 0, 0],
                ["X", 0, 0],
                ["X","X","X"]
            ],
            [
                ["X", "X", 0],
                [0, "X", 0],
                [0, "X", "X"]
            ],
            [
                ["X", 0, "X"],
                ["X", 0, "X"],
                ["X", "X", "X"],
            ],
            [
                ["X", 0, "X"],
                ["X", "X", "X"],
            ],
            [
                ["X", 0, 0, "X"],
                ["X", "X", "X", "X"],
            ],
            [
                [0, "X", "X"],
                [0, "X", 0],
                ["X", "X", 0],
            ],
            [
                ["X", "X", "X"],
                [0, "X", 0],
                [0, "X", 0],
            ],
            [
                [300]
            ],
            [
                [300,302],
                [303,301]
            ],
            [
                [301,302,300],
                [302,300,303],
                [300,303,301]
            ]
        ]
    },
    5: {
        rotation: true,
        timer: false,
        standardPieces: 8,
        tntPieces: 3,
        startGrid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        shapes: [
            [
                ["X"]
            ],
            [
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X"],
                ["X"],
                ["X"],
                ["X"]
            ],
            [
                ["X", "X"],
                ["X", "X"]
            ],
            [
                ["X", "X", "X"],
                ["X", "X", "X"],
                ["X", "X", "X"]
            ],
            [
                ["X", 0],
                ["X", "X"]
            ],
            [
                ["X", 0, 0],
                ["X", 0, 0],
                ["X","X","X"]
            ],
            [
                [300]
            ],
            [
                [300,302],
                [303,301]
            ],
            [
                [301,302,300],
                [302,300,303],
                [300,303,301]
            ]
        ]
    },
};