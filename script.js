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

        if ((leftHeight - rightHeight) > 1 || (rightHeight - leftHeight) > 1) {
            return false;
        } else {
            return true;
        }
    }

    rebalance(root) {
        if ((this.isBalanced(root) === true) || (root === null)) {
            return null;
        }

        let newArray = this.inOrder();
        console.log("newArray: " + newArray);

        this.root = this.buildTree(newArray, 0, newArray.length - 1);

        return this.root;
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


//TESTING - DRIVER SCRIPT

// Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
let unsortedArray = [];

for (let i = 0; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    unsortedArray.push(randomNumber);
}

console.log("unsortedArray: " + unsortedArray)
let sortedArray = unsortedArray.slice().sort(function(a, b) {
        return a - b;
    })

let myTree = new Tree(sortedArray); 

// Confirm that the tree is balanced by calling isBalanced.
console.log("isBalanced before: " + myTree.isBalanced(myTree.root));

// Print out all elements in level, pre, post, and in order.
let levelOrderResult = myTree.levelOrder();
console.log("levelOrder Result before: " + levelOrderResult);

let inOrderResult = myTree.inOrder();
console.log("inOrder Result before: " + inOrderResult);

let preOrderResult = myTree.preOrder();
console.log("preOrder Result before: " + preOrderResult);

let postOrderResult = myTree.postOrder();
console.log("postOrder Result before: " + postOrderResult);

displayTree(myTree.root);

// Unbalance the tree by adding several numbers > 100.
myTree.insert(Math.floor((Math.random() * 100) + 100));
myTree.insert(Math.floor((Math.random() * 100) + 100));
myTree.insert(Math.floor((Math.random() * 100) + 100));
myTree.insert(Math.floor((Math.random() * 100) + 100));
myTree.insert(Math.floor((Math.random() * 100) + 100));
myTree.insert(Math.floor((Math.random() * 100) + 100));

// Confirm that the tree is unbalanced by calling isBalanced.
console.log("isBalanced after inserts: " + myTree.isBalanced(myTree.root));

displayTree(myTree.root);

// Balance the tree by calling rebalance.
myTree.rebalance(myTree.root);

// Confirm that the tree is balanced by calling isBalanced.
console.log("isBalanced after rebalance: " + myTree.isBalanced(myTree.root));

// Print out all elements in level, pre, post, and in order.
let levelOrderResultAfter = myTree.levelOrder();
console.log("levelOrder Result after: " + levelOrderResultAfter);

let inOrderResultAfter = myTree.inOrder();
console.log("inOrder Result after: " + inOrderResultAfter);

let preOrderResultAfter = myTree.preOrder();
console.log("preOrder Result after: " + preOrderResultAfter);

let postOrderResultAfter = myTree.postOrder();
console.log("postOrder Result after: " + postOrderResultAfter);

displayTree(myTree.root);