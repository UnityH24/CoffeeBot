module.exports = {
    name: "chess",
    description: "play chess against the bot",
    execute(message, args, client) {
        
        const startPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const white = 1;
        const black = -1;

        class Piece {
            static Empty = 0;
            static King = 1;
            static Pawn = 2;
            static Knight = 3;
            static Bishop = 5
            static Rook = 6;
            static Queen = 7;
            
            static White = 8;
            static Black = 16;
            // 00001
            static isColor(piece, color) {
                return (((piece >>> 3) << 3) === color) ? true : false;
            }

            static isPromotion(move) {
                return move.Flag === moveFlags.Promotion;
            }

            static getPieceType(piece) {
                return piece
            }

            static isCapture(move) {
                return move.Flag === moveFlags.Capture;
            }

            static isEnPassant(move) {
                return move.Flag === moveFlags.EnPassantCapture;
            }
        };

        class moveFlags {
            static Capture;
            static EnPassantCapture;
            static Promotion;
        }
        
        
        
        /*
        const startPos = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const white = 1;
        const black = -1;

        files = {
            'a': 1,
            'b': 2,
            'c': 3,
            'd': 4,
            'e': 5,
            'f': 6,
            'g': 7,
            'h': 8
        };

        class moveFlags {

            static Capture = 0xF0;
            static CastleLong = 0xF1;
            static CastleShort = 0xF2;
            static PromotionToQueen = 0xF3;
            static PromotionToRook = 0xF4;
            static PromotionToBishop = 0xF5; 
            static PromotionToKnight = 0xF6;
            static enPassantCapture = 0xF7;
            static Promotion = 0xF8;
        } // 
        
        class King {
            constructor(color, rank, file) {
                this.color = color;
                this.rank = rank;
                this.file = file;
            }

            asChar() {
                return (this.color === white) ? 'K' : 'k';
            }
        }

        class Queen {
            constructor(color, rank, file) {
                this.color = color;
                this.rank = rank;
                this.file = file;
            }

            asChar() {
                return (this.color === white) ? 'Q' : 'q';
            }
        }

        class Rook {
            constructor(color, rank, file) {
                this.color = color;
                this.rank = rank;
                this.file = file;
            }

            asChar() {
                return (this.color === white) ? 'R' : 'r';
            }
        }

        class Bishop {
            constructor(color, rank, file) {
                this.color = color;
                this.rank = rank;
                this.file = file;
            }

            asChar() {
                return (this.color === white) ? 'B' : 'b';
            }
        }

        class Knight {

            constructor(color, rank, file) {
                this.color = color;
                this.rank = rank;
                this.file = file;
            }

            asChar() {
                return (this.color === white) ? 'N' : 'n';
            }
        }

        class Pawn {

            constructor(color, rank, file) {
                this.color = color;
                this.rank = rank;
                this.file = file;
            }

            asChar() {
                return (this.color === white) ? 'P' : 'p';
            }
        }

        class Empty {
            asChar() {
                return ' ';
            } 
        }

        class Bot {

            makeMove(board) {
                board.move(this.getMove(board));
            }

            getMove(board) {
                boardState = board.board;
                moves = board.getMoves();
            }
        }

        class Move {
            constructor(startSquare, targetSquare, board) {
                this.startSquare = startSquare;
                this.targetSquare = targetSquare;

                
                
            }
        }

        class Board {

            constructor(fen=startPos) {
                this.board;
                this.turn;
                this.castleRights;
                this.enPassantSquare;
                this.fiftyPlyCounter;
                this.fullMoveCount;
                this.bringFen(fen); // creating a position from a fen
                // this.whitePieces, this.blackPieces = this.countPieces(white), this.countPieces(black); // getting the number of pieces for both players
                message.channel.send(this.boardToString());
            }

            getPieces(color) {
                for (var rank = 0; rank < 8; ++rank) {
                    for (var file = 0; file < 8; ++file) {
                        piece = this.getPiece(rank, file)
                    }
                }
            }
            getMoves() {
                
            } 

            createEmptyBoard() {
                var board = {};

                for (square = 64; square > 0; --square) {
                    board[square] = new Empty();
                }

                return board;
            }

            move(move, inSearch=false) {

                var startSquare = move.toLowerCase().split(/-/)[0];
                var targetSquare = move.toLowerCase().split(/-/)[1];

                var startSquare = [ranksBack[startSquare[1]], filesBack[startSquare[0]]];
                var targetSquare =  [ranksBack[targetSquare[1]], filesBack[targetSquare[0]]];

                if (!(this.getPiece(startSquare[0], startSquare[1]).color === this.turn)) return;
                if ((typeof this.getPiece(startSquare[0], startSquare[1])) === Empty || this.getPiece(targetSquare[0], targetSquare[1]).color === this.getPiece(startSquare[0], startSquare[1]).color) {
                    return error;
                }

                this.board[targetSquare[0]][targetSquare[1]] = this.board[startSquare[0]][startSquare[1]];
                this.board[startSquare[0]][startSquare[1]] = new Empty();

                this.turn = (this.turn === white) ? black : white;

                message.channel.send(`\`\`\`\nmade move ${files[startSquare[1]]}${ranks[startSquare[0]]}-${files[targetSquare[1]]}${ranks[targetSquare[0]]}\n\`\`\``);
                message.channel.send(this.boardToString());
            }

            getPiece(square) {
                return this.board[square];
            }

            bringFen(fen) {
                var fenParts = fen.split(/ /);

                // position variables
                this.turn = (fenParts[1] === 'w') ? white : black;
                this.castleRights = fenParts[2]
                this.enPassantSquare = fenParts[3];
                this.fiftyPlyCounter = fenParts[4];
                this.fullMoveCount = fenParts[5];

                // board
                var board = this.createEmptyBoard();
                var ranks = fenParts[0].split('/');

                for (var rank = 0; rank < 8; ++rank) {
                    for (var char of ranks[rank]) {
                        if (parseInt(char)) {
                            for (var i = parseInt(char); i > 0; --i) {
                                board[rank].push(new Empty());
                            }
                        }

                        else if (char.toUpperCase() === 'K') {
                            board[rank].push(new King(char === char.toUpperCase() ? white : black, rank, board[rank].length - 1));
                        }

                        else if (char.toUpperCase() === 'Q') {
                            board[rank].push(new Queen(char === char.toUpperCase() ? white : black, rank, board[rank].length - 1));
                        }

                        else if (char.toUpperCase() === 'R') {
                            board[rank].push(new Rook(char === char.toUpperCase() ? white : black, rank, board[rank].length - 1));
                        }

                        else if (char.toUpperCase() === 'B') {
                            board[rank].push(new Bishop(char === char.toUpperCase() ? white : black, rank, board[rank].length - 1));
                        }

                        else if (char.toUpperCase() === 'N') {
                            board[rank].push(new Knight(char === char.toUpperCase() ? white : black, rank, board[rank].length - 1));
                        }

                        else if (char.toUpperCase() === 'P') {
                            board[rank].push(new Pawn(char === char.toUpperCase() ? white : black, rank, board[rank].length - 1));
                        }
                    }
                }

                this.board = board;

            }

            boardToString() {
                return `\`\`\`\n+---+---+---+---+---+---+---+---+\n| ${this.board[0][0].asChar()} | ${this.board[0][1].asChar()} | ${this.board[0][2].asChar()} | ${this.board[0][3].asChar()} | ${this.board[0][4].asChar()} | ${this.board[0][5].asChar()} | ${this.board[0][6].asChar()} | ${this.board[0][7].asChar()} | 8\n+---+---+---+---+---+---+---+---+\n| ${this.board[1][0].asChar()} | ${this.board[1][1].asChar()} | ${this.board[1][2].asChar()} | ${this.board[1][3].asChar()} | ${this.board[1][4].asChar()} | ${this.board[1][5].asChar()} | ${this.board[1][6].asChar()} | ${this.board[1][7].asChar()} | 7\n+---+---+---+---+---+---+---+---+\n| ${this.board[2][0].asChar()} | ${this.board[2][1].asChar()} | ${this.board[2][2].asChar()} | ${this.board[2][3].asChar()} | ${this.board[2][4].asChar()} | ${this.board[2][5].asChar()} | ${this.board[2][6].asChar()} | ${this.board[2][7].asChar()} | 6\n+---+---+---+---+---+---+---+---+\n| ${this.board[3][0].asChar()} | ${this.board[3][1].asChar()} | ${this.board[3][2].asChar()} | ${this.board[3][3].asChar()} | ${this.board[3][4].asChar()} | ${this.board[3][5].asChar()} | ${this.board[3][6].asChar()} | ${this.board[3][7].asChar()} | 5\n+---+---+---+---+---+---+---+---+\n| ${this.board[4][0].asChar()} | ${this.board[4][1].asChar()} | ${this.board[4][2].asChar()} | ${this.board[4][3].asChar()} | ${this.board[4][4].asChar()} | ${this.board[4][5].asChar()} | ${this.board[4][6].asChar()} | ${this.board[4][7].asChar()} | 4\n+---+---+---+---+---+---+---+---+\n| ${this.board[5][0].asChar()} | ${this.board[5][1].asChar()} | ${this.board[5][2].asChar()} | ${this.board[5][3].asChar()} | ${this.board[5][4].asChar()} | ${this.board[5][5].asChar()} | ${this.board[5][6].asChar()} | ${this.board[5][7].asChar()} | 3\n+---+---+---+---+---+---+---+---+\n| ${this.board[6][0].asChar()} | ${this.board[6][1].asChar()} | ${this.board[6][2].asChar()} | ${this.board[6][3].asChar()} | ${this.board[6][4].asChar()} | ${this.board[6][5].asChar()} | ${this.board[6][6].asChar()} | ${this.board[6][7].asChar()} | 2\n+---+---+---+---+---+---+---+---+\n| ${this.board[7][0].asChar()} | ${this.board[7][1].asChar()} | ${this.board[7][2].asChar()} | ${this.board[7][3].asChar()} | ${this.board[7][4].asChar()} | ${this.board[7][5].asChar()} | ${this.board[7][6].asChar()} | ${this.board[7][7].asChar()} | 1\n+---+---+---+---+---+---+---+---+\n  a   b   c   d   e   f   g   h\n\`\`\``;
            }


        }
        var board = new Board();
        var bot = new Bot();

        message.reply("Game created! please make the moves by using sq-tq notation (e.g e2-e4, O-O etc.) you can resign by using 'cc resign'");

        client.on("message", message2 => {
            if (!(message2.author === message.author)) return;

            if (message === "resign") {
                message.channel.send(`${message2.author.toString()}  resigned. Bot is victorious!`);
            } 

            else {
                try {
                    board.move(message2.content);
                    // bot.makeMove(board);
                }
                catch (error) {
                    message.channel.send(`Invalid move '${message2}'`);
                } 
            }
        });*/
    

    }
}