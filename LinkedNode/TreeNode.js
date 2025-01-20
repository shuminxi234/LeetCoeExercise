/*
 * @Author: shumx2 shumx2@lenovo.com
 * @Date: 2024-11-13 09:45:56
 * @LastEditors: shumx2 shumx2@lenovo.com
 * @LastEditTime: 2024-11-29 10:00:42
 * @FilePath: \LeetCoeExercise\LinkedNode\TreeNode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: shumx2 shumx2@lenovo.com
 * @Date: 2024-11-13 09:45:56
 * @LastEditors: shumx2 shumx2@lenovo.com
 * @LastEditTime: 2024-11-29 10:00:09
 * @FilePath: \LeetCoeExercise\LinkedNode\TreeNode.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
this.val = (val===undefined ? 0 : val)
this.left = (left===undefined ? null : left)
this.right = (right===undefined ? null : right)
}
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(p==null&&q==null)return true;
    if(p==null||q==null)return false;
    if(p.val!=q.val)return false;
    return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right);
};


function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

//理解前序遍历是root->左子树->右子树。中序是左->root->右。因此在inorder中leftlen（左->root）长度=preorder中的左子树的长度
//index获取的是root在中序中的位置
var buildTree = function(preorder, inorder) {
    let map=new Map();
    for(let i=0;i<inorder.length;i++){
        map.set(inorder[i],i);
    }
    function build(preorder,prestart,preend,inorder,instart,inend){
        if(prestart>preend)return null;
        let rootval=preorder[prestart];
        let index=map.get(rootval);
        let root=new TreeNode(rootval);
        let leftLen=index-instart;
        root.left=build(preorder,prestart+1,prestart+leftLen,inorder,instart,index-1);
        root.right=build(preorder,prestart+leftLen+1,preend,inorder,index+1,inend);
        return root;
    }
    return build(preorder,0,preorder.length-1,inorder,0,inorder.length-1);
};

// 测试示例
let preorder = [3, 9, 20, 15, 7];
let inorder = [9, 3, 15, 20, 7];
let root = buildTree(preorder, inorder);

function printTree(root) {
    if (!root) return;

    // 获取树的高度
    function getHeight(node) {
        if (!node) return 0;
        return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    }

    const height = getHeight(root);

    // 初始化二维数组来存储树的结构
    const matrix = Array.from({ length: height }, () => Array(2 ** height - 1).fill(' '));

    // 填充二维数组
    function fillMatrix(node, row, left, right) {
        if (!node) return;
        const mid = Math.floor((left + right) / 2);
        matrix[row][mid] = node.val.toString();

        fillMatrix(node.left, row + 1, left, mid - 1);
        fillMatrix(node.right, row + 1, mid + 1, right);
    }

    fillMatrix(root, 0, 0, 2 ** height - 2);

    // 打印二维数组
    matrix.forEach(row => {
        console.log(row.join(''));
    });
}

// 打印树的结构
printTree(root);

//inorder:left->root->right
//postorder:left->right->root
var buildTree2 = function(inorder, postorder) {
    let map=new Map();
    for(let i=0;i<inorder.length;i++){
        map.set(inorder[i],i);
    }
    function build(postorder,poststart,postend,inorder,instart,inend){
        if(poststart>postend)return null;
        let rootVal=postorder[postend];
        let index=map.get(rootVal);
        let root=new TreeNode(rootVal);
        let leftlen=index-instart;
        //righttreelen:postend
        root.right=build(postorder,poststart+leftlen,postend-1,inorder,instart+leftlen+1,inend);
        root.left=build(postorder,poststart+1,index,inorder,);
    }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
    this.stack=[];
    this.addleft(root);
};

//有this时最好不用箭头函数（只能理解作用域内的this），若要使用箭头函数还要显示绑定this，例如 .bind(this)）显式地绑定 this。
// BSTIterator.prototype.addleft=function(node){
//     while(node){
//         this.stack.push(node);
//         node=node.left;
//     }
// };
BSTIterator.prototype.addleft=((node)=>{
    while(node){
        this.stack.push(node);
        node=node.left;
    }
}).bind(BSTIterator.prototype);
/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let node=this.stack.pop();
    this.addleft(node.right);
    return node.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length>0;
};


/** 
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if(!root)return 0;
    if(root===1)return 1;
    const left=calcuateLevel(root.left);
    const right=calcuateLevel(root.right);
    if(left===right){
        return countNodes(root.right)+(1<<left);
    }else{
        return countNodes(root.left)+(1<<right);
    }
};

var calcuateLevel=function(root){
    let level=0;
    while(root){
        level+=1;
        root=root.left;
    }
    return level;
}

var lowestCommonAncestor = function(root, p, q) {
    if(root==null||root==p||root==q)return root;
    let left=lowestCommonAncestor(root.left,p,q);
    let right=lowestCommonAncestor(root.right,p,q);
    if(left==null&&right==null)return null;
    if(left==null)return right;
    if(right==null)return left;
    return root;
};

var countNodes2 = function(root) {
    if(!root)return 0;
    let left=countlevel(root.left);
    let right=countlevel(root.right);
    if(left==right){
        return countNodes(root.right)+(1<<left);
    }
    else{
        return countNodes(root.left)+(1<<right);
    }
}
var countlevel=function(root){
    let level=0;
    while(root){
        level++;
        root=root.left;
    }
    return level;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
  if(!root)return 0;
  let sumpath=-Infinity;
  const Maxgain=(root)=>{
    if(!root)return 0;
    let leftmaxgain=Math.max(Maxgain(root.left),0);
    let rightmaxgain=Math.max(Maxgain(root.right),0);
    let tempsumpath=leftmaxgain+rightmaxgain+root.val;
    sumpath=Math.max(tempsumpath,sumpath);
    return Math.max(leftmaxgain,rightmaxgain)+root.val;
  }  
  Maxgain(root);
  return sumpath;
};


var sumNumbers = function(root) {
    let sum=0;
    const dfs=(root,sum)=>{
        if(!root)return 0;
        sum=sum*10+root.val;
        if(!root.left&&!root.right)return sum;
        return dfs(root.left,sum)+dfs(root.right,sum);//如有10个节点，会被分解为sum1+sum2+sum3+...sum10
    };

    return dfs(root,sum);
};

var hasPathSum = function(root, targetSum) {
    if(!root)return false;
    if(!root.left&&!root.right)return targetSum===root.val;
    return hasPathSum(root.left,targetSum-root.val)||hasPathSum(root.right,targetSum-root.val);
};


/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */

//106. Construct Binary Tree from Inorder and Postorder Traversal
//helper:the order is :right,left,root
//postlast can't be defined in helper
var buildTree = function(inorder, postorder) {
    let indexmap=new Map();
    inorder.forEach((value,idx)=>{
        indexmap.set(value,idx);
    });
    let postlast=postorder.length-1;
    const helper=(start,end)=>{
        if(start>end)return null;
        let indexval=postorder[postlast];
        let index=indexmap.get(indexval);
        let root=new TreeNode(indexval);
        postlast--;
        root.right=helper(index+1,end);
        root.left=helper(start,index-1);
        return root;
    };
    let root=helper(0,postlast);
    return root;
};

var buildTree = function(preorder, inorder) {
    let indexmap=new Map();
    inorder.forEach((value,idx)=>{
        indexmap.set(value,idx);
    });
    const build=(preorder,prestart,preend,inorder,instart,inend)=>{
        if(prestart>preend)return null;
        let nodeval=preorder[prestart];
        let index=inorder.get(nodeval);
        let node=new TreeNode(nodeval);
        let leftlen=index-instart;
        node.left=build(preorder,prestart+1,prestart+leftlen,inorder,instart,index-1);
        node.right=build(preorder,prestart+leftlen+1,preend,inorder,index+1,inend);
        return node;
    };
    return build(preorder,0,preorder.length-1,inorder,0,inorder.length-1);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    //left,right
    //left.left==right.right,left.right== right.left
    if(!root)return true;
    const check=(leftnode,rightnode)=>{
        if(!leftnode&&!rightnode)return true;
        if(!leftnode||!rightnode)return false;
        if(leftnode.val!=rightnode.val)return false;        
        return check(leftnode.left,rightnode.right)&&check(leftnode.right,rightnode.left);
    };
    return check(root.left,root.right);
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
 */
var rightSideView = function(root) {
    if(!root)return [];
    let queue=[root];
    let number=[];
    while(queue.length>0){
        let size=queue.length;
        let node=null;      
        while(size>0){
            node=queue.shift();
            size--;
            if(node.left)queue.push(node.left);
            if(node.right)queue.push(node.right);
        }
        number.push(node.val);
    }
    return number;
};


var averageOfLevels = function(root) {
    if(!root)return [];
    let number=[];
    let queue=[root];
    while(queue.length>0){
        let node=null;
        let size=queue.length;
        let tempsum=0;
        for(let i=0;i<size;i++){
            node=queue.shift();
            tempsum+=node.val;
            if(node.left)queue.push(node.left);
            if(node.right)queue.push(node.right);
        }
        let finalSum=tempsum/size
        number.push(finalSum);
    }
    return number;
};

//Input: root = [3,9,20,null,null,15,7]
//Output: [[3],[9,20],[15,7]]
var levelOrder = function(root) {
    if(!root)return [];
    let queue1=[root];
    let queue2=[[]];
    while(queue1.length>0){
        let size=queue1.length;
        let level=[];
        for(let i=0;i<size;i++){
            node=queue1.shift();
            level.push(node.val);
            if(node.left)queue1.push(node.left);
            if(node.right)queue1.push(node.right);
        }
        queue2.push(level);        
    }
    return queue2;
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(!root)return [];
    var result=[];
    var stack1=[root];

    let Left_Right=true;
    while(stack1.length>0){
        let level=[];
        var stack2=[];        
        let size=stack1.length;
        for(let i=0;i<size;i++){
            let node=stack1.pop();
            if(!Left_Right){
                stack2.push(node);                

            }
            else{
                level.push(node.val);
            }
            if(node.left)stack1.push(node.left);
            if(node.right)stack1.push(node.right);
        }
        if(Left_Right){
            while(stack2.length>0){
                let node=stack2.pop();
                level.push(node.val);
            }
        }

        result.push(level);
        Left_Right=!Left_Right;
    }
    return result;
};

/**
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
 */
var buildTree = function(preorder, inorder) {
    let idxmap=new Map();
    inorder.forEach((value,index)=>{
        idxmap.set(value,index);
    });
    const helper=(preorder,prestart,preend,inorder,instart,inend)=>{
        if(prestart>preend)return null;
        let rootval=preorder[prestart];
        let index=idxmap.get(rootval);
        let leftlen=index-prestart;
        let node=new TreeNode(rootval);
        node.left=helper(preorder,prestart+1,prestart+leftlen,inorder,instart,index-1);
        node.right=helper(preorder,prestart+1+leftlen,preend,inorder,index+1,inend);
        return node;
    };
    return helper(preorder,0,preorder.length-1,inorder,0,inorder.length-1);
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function getMinimumDifference(root) {
    let minDiff=Infinity;
    let prev=null;
    const inorder=(node)=>{
        if(!node)return;
        inorder(node.left);
        if(prev){
            minDiff=Math.min(minDiff,Math.abs(node.val-prev));
        }
        prev=node.val;
        inorder(node.right);
    };
    inorder(root);
    return minDiff;
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let result=null;
    let count=0;
    const inorder=(node)=>{
        if(!node&&result!=null)return;
        inorder(node.left);
        count++;
        if(count===k){
            result=node.val;
            return;
        }
        inorder(node.right);
    };
    inorder(root);
    return result;
};


/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    const valid=(node,min,max)=>{
        if(!node)return true;
        if((min!=null&&node.val<=min)||(max!=null&&node.val>=max))return false;
        return (valid(node.left,min,node.val)&&valid(node.right,node.val,max));
    };
    return valid(root);
};


var buildTree = function(preorder, inorder) {
    let idxmap=new Map();
    inorder.forEach((value,index)=>{
        idxmap.set(value,index);
    });
    const helper=(preorder,prestart,preend,inorder,instart,inend)=>{
        if(prestart>preend)return null;
        let indexval=preorder[prestart];
        let node=new TreeNode(indexval);
        let index=idxmap.get(indexval);
        let leftlen=index-instart;
        node.left=helper(preorder,prestart+1,prestart+leftlen,inorder,instart,index-1);
        node.right=helper(preorder,prestart+leftlen+1,preend,inorder,index+1,inend);
        return node;
    };
    return helper(preorder,0,preorder.length-1,inorder,0,inorder.length-1);
    
};

// 核心逻辑：
// 在二分查找的过程中，left 和 right 的含义是动态更新的：
// left 始终指向可能包含目标值的左边界。
// right 始终指向可能包含目标值的右边界。
// 循环退出时，left 大于 right，left 的值表示目标值在当前数组中第一个大于等于目标值的位置，也就是插入的位置。
/**
 * @param {character[][]} grid
 * @return {number}
 */


var numIslands = function(grid) {
    if(grid.length===0||grid[0].length===0)return 0;
    let row=grid.length;
    let col=grid[0].length;
    let directory=[[1,0],[0,1],[-1,0],[0,-1]];
    const dfs=(x,y){
        if(x>=row||x<0||y>=col||y<0||grid[x][y]==='0')return;
        
    }
};