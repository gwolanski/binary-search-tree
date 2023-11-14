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

let unsortedArray = [3, 1, 20, 15, 4, 6, 10]
let sortedArray = unsortedArray.slice().sort(function(a, b) {
        return a - b;
    })

console.log("sortedArray: " + sortedArray);
let myTree = new Tree(sortedArray);
prettyPrint(myTree.root);

//UI
//allow user to enter in number to add to array
//each time a number is submitted, search through the existing array and make sure the number doesn't already exist
//if the number is already in the list, throw an error; if not, add it to the list and update display



