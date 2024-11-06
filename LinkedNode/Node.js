//constructor a random LinkedNode
class Node{
    constructor(val){
        this.val=val;
        this.next=null;
    }
}

class RandomNode extends Node{
    constructor(val){
        super(val);
        this.random=null;
    }
}
// function genRandomList(values,randomIndx){}
function copyRandomList(head){
    if(!head)return null;
    //step1;insert
    let current=head;
    while(current){
        let newNode=new RandomNode(current.val);
        newNode.next=current.next;
        current.next=newNode;
        current=newNode.next;
    }
    //step2;copy random Links;
    current=head;
    while(current){
        if(current.random){
            current.next.random=current.random.next;
        }
        current=current.next.next;
    }
    //step3;seprate two random links
    current=head;
    let newHead=head.next;
    let copyCurrent=newHead;
    while(current){
        current.next=current.next.next;
        if(copyCurrent.next){
            copyCurrent.next=copyCurrent.next.next;
        }
        current=current.next;
        copyCurrent=copyCurrent.next;
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

// 测试
let originalList = generateRandomLinkedList();
let copiedList = copyRandomList(originalList);

console.log(copiedList.next.next.random);



