import { BBSTNode } from "./Node.js";

export class BBST {
    constructor(arr) {
        arr.sort((a, b) => a - b);
        const noDuplicates = this.#removeDuplicates(arr)
        this.root = this.#buildTree(noDuplicates, 0, noDuplicates.length - 1);
    }

    #buildTree(arr, left, right) {
        if (left > right) return null;
        const mid = (Math.trunc((right + left) / 2));
        const root = new BBSTNode(arr[mid]);
        root.setLeft(this.#buildTree(arr, left, mid - 1));
        root.setRight(this.#buildTree(arr, mid + 1, right));
        return root;
    }

    #removeDuplicates(arr) {
        let result = [];
        let slow = 0;
        let fast = 0;
        while (fast < arr.length) {
            slow = fast;
            result.push(arr[slow]);
            while (arr[fast] === arr[slow]) {
                fast++;
            }
        }

        return result;
    }

    //insert
    insert(value) {
        const node = new BBSTNode(value);

        if (this.root === null) {
            this.head = node;
            return true;
        }
        let slowPtr = null;
        let fastPtr = this.root;
        while (fastPtr !== null) {
            slowPtr = fastPtr;
            if (value === fastPtr.data) {
                return false;
            } else if (value < fastPtr.data) {
                fastPtr = fastPtr.left;
            } else {
                fastPtr = fastPtr.right;
            }
        }

        if (slowPtr.data > value) {
            slowPtr.setLeft(node);
        } else {
            slowPtr.setRight(node);
        }
        return true;
    }

    // delete
    delete(value) {
        const curTree = this.#deleteHelper(this.root, value)
        if (this.curTree === null) return false;
        this.head = curTree;
        return true;

    }

    #deleteHelper(root, value) {
        if (root === null) return root;
        if (root.data > value) {
            root.setLeft(this.#deleteHelper(root.left, value));
            return root;
        } else if (root.data < value) {
            root.setRight(this.#deleteHelper(root.right, value));
            return root;
        }


        if (root.left === null && root.right === null) {
            return null;
        } else if (root.left === null) {
            return root.right;
        } else if (root.right == null) {
            return root.left;
        } else {

            let slowPtr = root;
            let ptr = root.right;
            while (ptr.left !== null) {
                slowPtr = ptr;
                ptr = ptr.left;
            }

            if (slowPtr !== root) {
                root.setLeft(ptr.right);
            } else {
                root.setRight(ptr.right);
            }
            root.data = ptr.data;
            return root;
        }
    }

    find(value) {
        let ptr = this.root;
        while (ptr !== null) {
            if (ptr.data < value) {
                ptr = ptr.right;
            } else if (ptr.data > value) {
                ptr = ptr.left;
            } else {
                return ptr;
            }
        }
        return ptr;
    }

    levelOrder(callback = this.#printout, root = this.root, result = []) {
        const q = [];
        let ptr = null;
        q.push(root);
        while (q.length > 0) {
            ptr = q.shift();
            callback(ptr.data);
            result.push(ptr.data);
            if (ptr.left) q.push(ptr.left);
            if (ptr.right) q.push(ptr.right);
        }
        return result;
    }

    #printout = (data) => {
        // console.log(`${data} `);
    };

    inorder(callback = this.#printout, root = this.root, result = []) {
        let ptr = root;
        if (ptr === null) {
            return result;
        } else {
            callback(ptr.data);
            result.push(ptr.data);
            this.inorder(callback, ptr.left, result);
            this.inorder(callback, ptr.right, result);
        }
        return result;
    }

    preorder(callback = this.#printout, root = this.root, result = []) {
        let ptr = root;
        if (ptr === null) {
            return result;
        } else {
            this.preorder(callback, ptr.left, result);
            callback(ptr.data);
            result.push(ptr.data);
            this.preorder(callback, ptr.right, result);
        }
        return result;
    }

    postorder(callback = this.#printout, root = this.root, result = []) {
        let ptr = root;
        if (ptr === null) {
            return result;
        } else {
            this.postorder(callback, ptr.left);
            this.postorder(callback, ptr.right);
            result.push(ptr.data);
            callback(ptr.data);
        }
        return result;
    }

    height(node = this.root) {
        if (!node) return 0;
        return Math.max(1 + this.height(node.left), 1 + this.height(node.right));
    }

    depth(node, ptr = this.root, depth = 0) {
        if (ptr === null) return -1;
        if (node.data === ptr.data) return depth;

        if (ptr.data < node.data) {
            return this.depth(node, ptr.right, depth + 1);
        } else {
            return this.depth(node, ptr.left, depth + 1);
        }
    }

    isBalanced() {
        return (this.#isBalancedHelper(this.root) > 0);
    }

    #isBalancedHelper(node) {
        if (node === null) return 0;
        let left = this.#isBalancedHelper(node.left)
        if (left === -1) return -1;
        let right = this.#isBalancedHelper(node.right);
        if (right === -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return (Math.max(left, right) + 1);
    }

    rebalance() {
        let vals = this.inorder();
        vals.sort((a, b) => a - b)
        this.root = this.#buildTree(vals, 0, vals.length - 1);
    }
}


