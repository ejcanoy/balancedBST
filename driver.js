import { BBST } from "./BalancedBinarySearchTree.js";

const arr = [];
const arrSize = Math.floor(Math.random() * 25);

for (let i = 0; i < arrSize; i++) {
    arr.push(Math.floor(Math.random() * 100));
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const bbst = new BBST(arr);
prettyPrint(bbst.root);
console.log(bbst.isBalanced());
console.log(bbst.levelOrder());
console.log(bbst.preorder());
console.log(bbst.postorder());
console.log(bbst.inorder());

const addNewNumbers = Math.floor(Math.random() * 25);

for (let i = 0; i < addNewNumbers; i++) {
    bbst.insert(Math.floor(Math.random() * 100));
}

prettyPrint(bbst.root);
console.log(bbst.isBalanced());
bbst.rebalance();
prettyPrint(bbst.root);
console.log(bbst.isBalanced());
console.log(bbst.levelOrder());
console.log(bbst.preorder());
console.log(bbst.postorder());
console.log(bbst.inorder());