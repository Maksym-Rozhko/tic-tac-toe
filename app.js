const X = 'x';
const O = '0';
const EMPTY = '';

const game = {
    board: [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
    ],
    currentUser: X,
    step(rowIndex, cellIndex) {
        const { currentUser, board } = this;

        if (board[rowIndex][cellIndex] !== EMPTY)  {
            return ;
        }

        if (board[rowIndex][cellIndex] !== EMPTY)  {
            return ;
        }

        this.board[rowIndex][cellIndex] = currentUser;

        const win = this.checkWin();

        this.currentUser = currentUser === X ? O : X;
        this.fillCell(rowIndex, cellIndex, currentUser);

        if (win) {
            alert(`Выиграл ${currentUser === X ? 'Крестоносец' : 'Очкошник'}`);
        }

        const flatBoard = board.flat();
        const hasEmpty = flatBoard.some(function(cellData) {
            return cellData === EMPTY;
        });

        if (!hasEmpty) {
            alert('НИЧЬЯ!!!')
        }
    },
    checkWin() {
        const lines = this.getLines();
        const { isLineWin, currentUser } = this;
        const winLine = lines.find(function(line) {
            return isLineWin(line, currentUser);
        });

        return !!winLine;
    },
    getLines() {
        const lines = this.board.map(function(rowData, rowIndex) {
            return {
                items: rowData,
                index: rowIndex,
                type: 'row',
            };
        });

        const { board } = this;

        for (let i = 0; i < 3; i++) {
            lines.push({
                items: [
                    board[0][i],
                    board[1][i],
                    board[2][i],
                ],
                index: i,
                type: 'column',
            });
        };

        lines.push({
            items: [
                board[0][0],
                board[1][1],
                board[2][2],
            ],
            index: 0,
            type: 'diagonal',
        });

        lines.push({
            items: [
                board[0][2],
                board[1][1],
                board[2][0],
            ],
            index: 0,
            type: 'diagonal',
        });

        return lines;
    },
    isLineWin(line, symbol) {
        return line.items.every(function(data) {
            return data === symbol;
        })
    },
    fillCell(rowIndex, cellIndex, symbol) {
        const cell = this.cells[rowIndex][cellIndex];
        const cellData = this.board[rowIndex][cellIndex];

        if (cellData === X) {
            cell.append(this.createX());
        } else if (cellData === O) {
            cell.append(this.createO());
        };
    },
    clickOnCell(rowIndex, cellIndex) {
        this.step(rowIndex, cellIndex);
    },
    init() {
        this.boardEl = document.querySelector('.cross__board');
        this.cells = [];

        const rows = this.boardEl.querySelectorAll('.cross__board--row');

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = Array.from(row.querySelectorAll('.cross__board-item'));

            this.cells.push(cells);

            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];

                cell.addEventListener('click', this.clickOnCell.bind(this, i, j));
            }
        }
        this.render();
    },
    createX() {
        const rootEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        rootEl.setAttribute('class', 'x cross__board-item-el');
        rootEl.setAttribute('viewBox', '0 0 80 80');

        line1.setAttribute('class', 'x__line1');
        line1.setAttribute('x1', '20');
        line1.setAttribute('y1', '10');
        line1.setAttribute('x2', '60');
        line1.setAttribute('y2', '70');

        line2.setAttribute('class', 'x__line2');
        line2.setAttribute('x1', '60');
        line2.setAttribute('y1', '10');
        line2.setAttribute('x2', '20');
        line2.setAttribute('y2', '70');

        rootEl.append(line1, line2);

        return rootEl;
    },
    createO() {
        const rootEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const ellipseEl = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        rootEl.setAttribute('class', 'o cross__board-item-el');
        rootEl.setAttribute('viewBox', '0 0 80 80');

        ellipseEl.setAttribute('cx', '40');
        ellipseEl.setAttribute('cy', '40');
        ellipseEl.setAttribute('rx', '20');
        ellipseEl.setAttribute('ry', '30');

        rootEl.append(ellipseEl);

        return rootEl;
    },
    render() {
        const { board, createX, createO } = this;

        this.cells.forEach(function(row, rowIndex) {
            row.forEach(function (cell, cellIndex) {
                const cellData = board[rowIndex][cellIndex];

                cell.innerText = '';

                if (cellData === X) {
                    cell.append(createX());
                } else if (cellData === O) {
                    cell.append(createO());
                };
            });
        });
    },
};

game.init();  // this = game;