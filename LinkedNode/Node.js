//constructor a random LinkedNode
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class RandomNode extends Node {
    constructor(val) {
        super(val);
        this.random = null;
    }
}
// function genRandomList(values,randomIndx){}
function copyRandomList(head) {
    if (!head) return null;
    //step1;insert
    let current = head;
    while (current) {
        let newNode = new RandomNode(current.val);
        newNode.next = current.next;
        current.next = newNode;
        current = newNode.next;
    }
    //step2;copy random Links;
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    //step3;seprate two random links
    current = head;
    let newHead = head.next;
    let copyCurrent = newHead;
    while (current) {
        current.next = current.next.next;
        if (copyCurrent.next) {
            copyCurrent.next = copyCurrent.next.next;
        }
        current = current.next;
        copyCurrent = copyCurrent.next;
    }
    return newHead;
}

function generateRandomLinkedList() {
    // 创建链表节点
    let node1 = new RandomNode(7);
    let node2 = new RandomNode(13);
    let node3 = new RandomNode(11);
    let node4 = new RandomNode(10);
    let node5 = new RandomNode(1);

    // 建立链表的 next 关系
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    // 建立随机指针 (random)
    node1.random = null;           // 随机指针为 null
    node2.random = node1;          // 指向节点1
    node3.random = node5;          // 指向节点5
    node4.random = node2;          // 指向节点2
    node5.random = node1;          // 指向节点1

    return node1;  // 返回链表的头节点
}

// // 测试
// let originalList = generateRandomLinkedList();
// let copiedList = copyRandomList(originalList);

// console.log(copiedList.next.next.random);

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
// 定义链表节点//constructor a random LinkedNode
// class ListNode{
//     constructor(val){
//         this.val=val;
//         this.next=null;
//     }
// }
// 定义链表节点
function ListNode(val) {
    this.val = val;
    this.next = null;
}

var reverseBetween = function (head, left, right) {
    if (!head || left === right) return head;

    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    // Step 1: Move prev to the node just before 'left'
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }

    /*初始化：
    curr 指向 prev.next，即反转区间的第一个节点。
    next 用来存储当前节点的下一个节点，防止丢失链表。
    prev 指向节点 1，prev.next 是节点 2（即 left 位置的节点）。
    curr 指向节点 2，next 是 null，因为我们还没有反转任何节点。
    最终是把prev连接next。prev是不变的。后半段连接current。也就是prev-next-current
    */
    // Step 2: Reverse the part between left and right
    let curr = prev.next; // 'curr' starts at position 'left'
    let next = null;
    printLinkedList(dummy.next);
    for (let i = 0; i < right - left + 1; i++) {
        let temp = curr.next;
        curr.next = next;
        next = curr;
        curr = temp;
        console.log("temp=" + temp.val + " ,curr=" + curr.val + " ,next=" + next.val + " ,prev=" + prev.val);
        printLinkedList(curr);
        printLinkedList(next);
        printLinkedList(prev);
    }

    // Step 3: Connect the reversed part back to the list
    prev.next.next = curr; // Connect the (left + 1)th node to the (right + 1)th node
    prev.next = next; // Connect the (left - 1)th node to the new head of the reversed part

    return dummy.next;
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Helper function to print the linked list
function printLinkedList(head) {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    console.log(result.join(" -> "));
}

// // Example usage:
// let head = createLinkedList([1, 2, 3, 4, 5]);
// let left = 2, right = 4;
// let newHead = reverseBetween(head, left, right);
// printLinkedList(newHead); // Output should be [1, 4, 3, 2, 5]

// class ListNode {
//     constructor(val = 0, next = null) {
//         this.val = val;
//         this.next = next;
//     }
// }

//kth is 5,10,15,20,25,30
function reverseKGroup(head,k){
    let dummy=new ListNode(0);
    dummy.next=head;
    let prevGroupEnd=dummy;
    while(true){
        let kth=getKthNode(prevGroupEnd,k);
        if(!kth)break;
        let groupStart=prevGroupEnd.next;
        let nextGroupStart=kth.next;
        reverseLinkedList(groupStart,k);
        prevGroupEnd.next=kth;
        groupStart.next=nextGroupStart;
        prevGroupEnd=groupStart;
    }
    return dummy.next;
}

function getKthNode(start,k){
    while(start&&k>0){
        start=start.next;
        k--;
    }
    return start;
}
function reverseLinkedList(head,k){
    let prev=null;
    let curr=head;
    while(k>0){
        let nextNode=curr.next;
        curr.next=prev;
        prev=curr;
        curr=nextNode;
        k--;
    }
}


// // 创建链表 [1 -> 2 -> 3 -> 4 -> 5]
// //连续等于是，自右向左的
// let head = new ListNode(1);
// let curr = head;
// for(let i=2;i<=20;i++){
//     curr=curr.next=new ListNode(i);
// }

// // 执行反转操作
// let k = 5;
// let newHead = reverseKGroup(head, k);

// // 打印结果链表
// let result = [];
// while (newHead) {
//     result.push(newHead.val);
//     newHead = newHead.next;
// }
// console.log(result);  // 输出: [2, 1, 4, 3, 5]

var removeNthFromEnd = function(head, n) {
    let curr=head;
    for(let i=1;i<n;i++){
        curr=curr.next;
        console.log(curr.val);
    }
};


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummy=new ListNode(0);
    let curr=dummy;
    let carry=0;
    while(l1||l2||carry){
        let a=l1!=null?l1.val:0;
        let b=l2!=null?l2.val:0;
        let sum=a+b+carry;
        carry=Math.floor(sum/10);
        curr.next=new ListNode(sum%10);
        curr=curr.next;
        if(l1)l1=l1.next;
        if(l2)l2=l2.next;
    }
    return dummy.next;
};

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    if(list1==null)return list2;
    if(list2==null)return list1;
    if(list1.val<list2.val){
        list1.next=mergeTwoLists(list1.next,list2);
        return list1;
    }
    else{
        list2.next=mergeTwoLists(list2.next,list1);
        return list2;
    }
};

/**
 * @param {_Node} head
 * @return {_Node}
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
*/
/*
方法一：迭代法
迭代法是最直观也是最常用的方法。基本思路是使用三个指针分别指向当前节点、前一个节点和后一个节点，通过改变当前节点的指向来逐步完成整个链表的反转。

初始化：
prev 指向 null（因为反转后，原来的头节点会指向 null）。
curr 指向链表的头节点 head。
遍历链表：
在每次迭代中，先保存 curr 的下一个节点 next。
将 curr 的 next 指针指向前一个节点 prev。
更新 prev 和 curr，分别移动到 curr 和 next。
结束条件：
当 curr 变为 null 时，链表已完全反转，此时 prev 指向新的头节点。

为什么不可以        nextNode.next=curr

ChatGPT 说：
ChatGPT
如果直接使用 nextNode.next = curr，会导致链表结构错误，无法正确完成链表反转。这里的原因在于反转逻辑和链表连接顺序的要求。我们来看一下为什么 nextNode.next = curr 不起作用，并详细解释一下正确操作的必要性。

反转链表的关键逻辑
在每一步反转操作中，我们希望将节点插入到 prev 之后，而不是在 curr 之后。这是因为 prev 始终指向反转部分的开头位置（反转链表的“头部”位置）。通过将 nextNode 插入到 prev 之后，nextNode 成为新的头部节点，从而实现头插法反转的效果。
*/
var reverseBetween = function(head, left, right) {
    let dummy=new ListNode(0);
    dummy.next=head;
    let prev=dummy;
    for(let i=0;i<left-1;i++){
        prev=prev.next;
    }
    //now prev.next=left
    let curr=prev.next;
    for(let i=0;i<right-left;i++){
        let nextNode=curr.next;
        
    }
};