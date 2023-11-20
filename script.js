class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }

    insert(data) {
        this.root = this.insertNode(this.root, data);
    } 

    buildTree(arr, start, end) {
  
        if (start > end) {
            return null;
        }
    
        let mid = Math.floor((start + end)/2);
    
        let node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
    
        return node;
    }
    
    insertNode(root, data) {
        if (root === null) {
            root = new Node(data);
            return root;
        }
    
        if (data < root.data) {
            root.left = this.insertNode(root.left, data);
        } else if (data > root.data) {
            root.right = this.insertNode(root.right, data);
        }
    
        return root;
    }

    deleteNode(root, data) {
        if (root === null) {
            return root
        }
    
        if (data < root.data) {
            root.left = this.deleteNode(root.left, data);
        } else if (data > root.data) {
            root.right = this.deleteNode(root.right, data);
        } else {
            //if only one child node
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
        
             //if both child nodes exist
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
        }
            return root;
    }

    find(root, value) {
        if (root === null) {
            return null;
        }
    
        if (value == root.data) {
            return root;
        } else if (value < root.data) {
            return this.find(root.left, value);
        } else if (value > root.data) {
            return this.find(root.right, value);
        }
    
        return root;
    }

    levelOrder(callback = null) {
        if (this.root === null) {
            return [];
        }
    
        const result = [];
        let queue = [this.root];
    
        while (queue.length > 0) {
            let current = queue.shift();
            result.push(current.data);
    
            if (callback && typeof callback === "function") {
                callback(current);
            }
    
            if (current.left) {
                queue.push(current.left);
            }
    
            if (current.right) {
                queue.push(current.right);
            }
        }
        return result;
    }

    inOrder(callback = null) {
        if (this.root === null) {
           return []; 
        }

        const result = [];

        const inOrderTraversal = (node) => {
            if (node) {
                inOrderTraversal(node.left);
                result.push(node.data);
            
                if (callback && typeof callback == "function") {
                callback(node);
            }
            inOrderTraversal(node.right); 
            }
        };

        inOrderTraversal(this.root);

        return result;
    }

    preOrder(callback = null) {
        if (this.root === null) {
            return []; 
         }
 
         const result = [];
 
         const preOrderTraversal = (node) => {
             if (node) {
                 result.push(node.data);
             
                 if (callback && typeof callback == "function") {
                 callback(node);
             }
             preOrderTraversal(node.left); 
             preOrderTraversal(node.right);
             }
         };
 
         preOrderTraversal(this.root);
 
         return result;
    }

    postOrder(callback = null) {
        if (this.root === null) {
            return []; 
         }
 
         const result = [];
 
         const postOrderTraversal = (node) => {

            if (node) {
                postOrderTraversal(node.left); 
                postOrderTraversal(node.right);  
                result.push(node.data);
             
                 if (callback && typeof callback == "function") {
                 callback(node);
             }

             }
         };
 
         postOrderTraversal(this.root);
 
         return result;
    }

    //use this.find() to find node first, then plug that variable into this function
    height(node) {
        if (node === null) {
            return null;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    //use this.find() to find node first, then plug that variable into this function
    depth(node) {        
        if (node === null) {
            return null;
        }

        let nodeDepth = -1;
        let level = 0;
        let queue = [this.root];
    
        while (queue.length > 0) {
            const queueLength = queue.length;
            for (let i = 0; i < queueLength; i++) {
                let current = queue.shift();
                if (current.data === node.data) {
                    nodeDepth = level;
                }
                if (current.left) {
                    queue.push(current.left);
                }
                if (current.right) {
                    queue.push(current.right);
                }
            }
            level++;
        }

        return nodeDepth;
    }   

    isBalanced(root) {
        if (root === null) {
            return null;
        }

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
        console.log("leftHeight: " + leftHeight);
        console.log("rightHeight: " + rightHeight);

        if ((leftHeight - rightHeight) > 1 || (rightHeight - leftHeight) > 1) {
            return false;
        } else {
            return true;
        }
    }

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

let myTree = new Tree(sortedArray);

myTree.insert(2);
myTree.insert(4);
myTree.insert(7);
myTree.insert(21);
myTree.insert(22);

// myTree.deleteNode(myTree.root, 0);
let findThis = myTree.find(myTree.root, 7);

const resultWithoutCB = myTree.levelOrder();

// myTree.levelOrder((node) => {
//     console.log("processing node: ", node.data);
// })

// myTree.postOrder((node) => console.log(node.data));
// let nodeHeight = myTree.height(findThis);
// console.log ("nodeHeight: " + nodeHeight);
let nodeDepth = myTree.depth(findThis);
console.log("nodeDepth: " + nodeDepth);

console.log("isBalanced: " + myTree.isBalanced(myTree.root));

displayTree(myTree.root);


//UI
//allow user to enter in number to add to array
//each time a number is submitted, search through the existing array and make sure the number doesn't already exist
//if the number is already in the list, throw an error; if not, add it to the list and update display



