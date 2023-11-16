class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr, 0, arr.length - 1);
    }
}

function buildTree(arr, start, end) {
  
    if (start > end) {
        return null;
    }

    let mid = Math.floor((start + end)/2);

    let node = new Node(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
}

// let root = null;

function insert(data) {
    myTree.root = insertNode(myTree.root, data);
} 

function insertNode(root, data) {
    if (root === null) {
        root = new Node(data);
        return root;
    }

    if (data < root.data) {
        root.left = insertNode(root.left, data);
    } else if (data > root.data) {
        root.right = insertNode(root.right, data);
    }

    return root;
}

function deleteNode(root, data) {
    if (root === null) {
        return root
    }

    if (root.data > data) {
        root.left = deleteNode(root.left, data);
        return root;
    } else if (root.data < data) {
        root.right = deleteNode(root.right, data);
        return root;
    }

    //if only one child node
    if (root.left === null) {
        let temp = root.right;
        delete root;
        return temp;
    } else if (root.right === null) {
        let temp = root.left;
        delete root;
        return temp;
    } //if both child nodes exist
    else {
        let successorParent = root;
        let successor = root.right;
        while (successor.left !== null) {
            successorParent = successor;
            successor = successor.left;
        }

        if (successorParent !== root) {
            successorParent.left = successor.right;
        } else {
            successorParent.right = successor.right;
        }

        root.data = successor.data;

        delete successor;
        return root;
    }
}

function find(root, value) {
    if (root === null) {
        return root
    }

    if (value == root.data) {
        return root;
    } else if (value < root.data) {
        return find(root.left, value);
    } else if (value > root.data) {
        return find(root.right, value);
    }

    return root;
}

const displayTree = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      displayTree(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      displayTree(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let unsortedArray = [3, 1, 20, 15, 4, 6, 10]
let sortedArray = unsortedArray.slice().sort(function(a, b) {
        return a - b;
    })

console.log("sortedArray: " + sortedArray);
let myTree = new Tree(sortedArray);

insert(2);
insert(4);
insert(7);
deleteNode(myTree.root, 3);
let findThis = find(myTree.root, 1);
console.log("find: " + findThis);

displayTree(myTree.root);


//UI
//allow user to enter in number to add to array
//each time a number is submitted, search through the existing array and make sure the number doesn't already exist
//if the number is already in the list, throw an error; if not, add it to the list and update display



