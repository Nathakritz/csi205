import { useState } from "react";

function SaveAllCompletedModal({ show, handleClose, handleSave }) {
    if (!show) return null; // ไม่แสดงอะไรเลยถ้า show เป็น false

    // ใช้ State สำหรับฟอร์มใน Modal
    const [moduleName, setModuleName] = useState("");
    const [note, setNote] = useState("");

    const onSave = () => {
        if (!moduleName.trim()) {
            alert("กรุณาป้อนชื่อ Module ก่อนบันทึก");
            return;
        }
        // เรียกฟังก์ชันบันทึกข้อมูลทั้งหมดที่เสร็จแล้ว (done)
        handleSave(moduleName, note);
        
        // Reset state หลังบันทึก
        setModuleName("");
        setNote("");
        handleClose();
    };

    return (
        // Modal Overlay และ Container (คล้าย Modal ของ Bootstrap)
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg w-full max-w-md shadow-2xl animate-fade-in">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">บันทึกรายการที่เสร็จแล้ว 💾</h2>
                    <button 
                        onClick={handleClose} 
                        className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Body (จำลองโครงสร้าง Form Group ของ Bootstrap) */}
                <div className="p-4">
                    <form>
                        {/* Form Group 1: Module Name (แทน Email address) */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Module Name (Required)
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter module name, e.g., 'Completed Batch 1'"
                                autoFocus
                                value={moduleName}
                                onChange={(e) => setModuleName(e.target.value)}
                            />
                        </div>
                        
                        {/* Form Group 2: Note (แทน Example textarea) */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Additional Notes (Optional)
                            </label>
                            <textarea 
                                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3} 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                {/* Modal Footer (จำลอง Button ของ Bootstrap) */}
                <div className="flex justify-end gap-2 p-4 border-t">
                    <button 
                        onClick={handleClose} 
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition" // Secondary
                    >
                        Close
                    </button>
                    <button 
                        onClick={onSave} 
                        className={`px-4 py-2 rounded-md font-semibold transition ${
                            moduleName.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700' // Primary
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!moduleName.trim()}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// 2. Component หลัก Todos
// ------------------------------------------------------------------
export default function Todos() {
  const [todos, setTodos] = useState([
    { id: 1, title: "delectus aut autem", status: "waiting" },
    { id: 2, title: "quis ut nam facilis et officia qui", status: "waiting" },
    { id: 3, title: "fugiat veniam minus", status: "waiting" },
    { id: 4, title: "et porro tempora", status: "done" },
    { id: 5, title: "laboriosam mollitia et enim adipisci quae provident illum", status: "waiting" },
    { id: 6, title: "qui ullam ratione quibusdam voluptatem quia omnis", status: "waiting" },
    { id: 7, title: "illo expedita consequatur quia in", status: "waiting" },
    { id: 8, title: "quo adipisci enim quam ut ab", status: "done" },
    { id: 9, title: "molestiae perspiciatis ipsa", status: "waiting" },
    { id: 10, title: "illo est ratione doloremque quia maiores aut", status: "waiting" },
  ]);

  const [showWaitingOnly, setShowWaitingOnly] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  
  // State สำหรับควบคุม Save All Modal
  const [showSaveAllModal, setShowSaveAllModal] = useState(false);
  const [savedTodos, setSavedTodos] = useState([]);

  // Logic การกรองและการแบ่งหน้า (เดิม)
  const filteredTodos = showWaitingOnly
    ? todos.filter((t) => t.status === "waiting")
    : todos;

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };
  
  // ------------------------------------------------------------------
  // ฟังก์ชันสำหรับการบันทึกข้อมูล (สำหรับ Modal)
  // ------------------------------------------------------------------
  const handleSaveData = (todo, moduleName, note = "") => {
    // ใช้ในการบันทึกข้อมูลทีละรายการ
    if (savedTodos.some(t => t.id === todo.id)) {
        console.log(`รายการ ID ${todo.id} ถูกบันทึกไปแล้ว!`);
        return false; // ไม่บันทึก
    }
    
    const saved = {
      id: todo.id,
      title: todo.title,
      module: moduleName,
      note: note,
      savedAt: new Date().toLocaleString(),
    };
    
    setSavedTodos((prevSaved) => [...prevSaved, saved]);
    return true; // บันทึกสำเร็จ
  };
  
  const handleSaveAllCompleted = (moduleName, note) => {
    const doneTodos = todos.filter(t => t.status === 'done');
    let savedCount = 0;
    
    doneTodos.forEach(todo => {
      if (handleSaveData(todo, moduleName, note)) {
        savedCount++;
      }
    });

    alert(`บันทึกรายการที่เสร็จแล้ว (${savedCount} รายการ) ลงใน '${moduleName}' เรียบร้อยแล้ว!`);
  };
  
  const toggleStatus = (todo) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, status: t.status === "waiting" ? "done" : "waiting" } : t
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRowClick = (todo) => {
    const message = `คุณกดรายการที่มี ID = ${todo.id}\nชื่อเรื่อง: ${todo.title}`;
    alert(message);
    console.log(message);
  };
  
  const handleAddTodo = () => {
    if (newTitle.trim() === "") return;

    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      title: newTitle,
      status: "waiting",
    };

    setTodos([...todos, newTodo]);
    setNewTitle("");
    setIsAddModalOpen(false);
  };

  const handleFilterOrPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleHeaderSaveClick = (e) => {
    e.stopPropagation();
    // เปิด Modal เมื่อกดปุ่ม Save ใน Header
    setShowSaveAllModal(true);
  };
  
  // ------------------------------------------------------------------
  // ส่วน Render (JSX)
  // ------------------------------------------------------------------
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-xl rounded-xl w-[90%] md:w-[80%] lg:w-[70%] p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Todos List
        </h1>

        {/* Toolbar (เดิม) */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
            <label className="flex items-center gap-2 cursor-pointer border border-gray-300 px-3 py-1 rounded-md">
                <input
                type="checkbox"
                className="sr-only peer"
                checked={showWaitingOnly}
                onChange={() => {
                    setShowWaitingOnly(!showWaitingOnly);
                    setCurrentPage(1);
                }}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                <span className="text-sm font-medium text-gray-700">
                Show only{" "}
                <span className="bg-yellow-400 px-2 py-0.5 rounded text-sm font-semibold text-black">
                    waiting ⏱
                </span>
                </span>
            </label>
            <select
                value={itemsPerPage}
                onChange={(e) => handleFilterOrPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
                <option value="5">5 items per page</option>
                <option value="10">10 items per page</option>
                <option value="50">50 items per page</option>
                <option value="100">100 items per page</option>
            </select>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl rounded-lg w-10 h-10 flex items-center justify-center shadow"
            >
                +
            </button>
        </div>

        {/* Table */}
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-2 py-2 text-left w-12 border border-gray-300">ID</th>
              <th className="px-2 py-2 text-left border border-gray-300">Title</th>
              {/* ปุ่ม Save Icon ในหัวตาราง (สำหรับเปิด Modal) */}
              <th className="px-2 py-2 text-center border border-gray-300">
                <div className="flex items-center justify-center gap-1">
                  Completed
                  <button
                    onClick={handleHeaderSaveClick} // <-- เมื่อกดปุ่มนี้ Modal จะเด้งขึ้นมา
                    className="p-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                    title="Save All Completed Todos"
                  >
                    💾
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedTodos.map((todo) => (
              <tr
                key={todo.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => handleRowClick(todo)}
              >
                <td className="border border-gray-300 px-2 py-2 text-center">{todo.id}</td>
                <td className="border border-gray-300 px-2 py-2">{todo.title}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="flex justify-center items-center gap-2">
                    {/* ปุ่ม Status */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(todo);
                      }}
                      className={`px-3 py-1 rounded font-semibold text-xs ${
                        todo.status === "waiting"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {todo.status === "waiting" ? "waiting ⏱" : "done ✔"}
                    </button>

                    {/* ปุ่ม Save Icon สีม่วง ถูกลบออกแล้ว */}
                    
                    {/* ปุ่ม Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                        console.log(`ลบรายการ ID = ${todo.id}`);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-sm" 
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {displayedTodos.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4 italic">
                  No todos to display
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination (เดิม) */}
        <div className="flex justify-center items-center gap-2 mt-4 text-sm">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-200 disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2 py-1 border rounded bg-white hover:bg-gray-200 disabled:opacity-50"
          >
            Last
          </button>
        </div>

        {/* Modal เพิ่ม Todo (เดิม) */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">เพิ่มรายการใหม่</h2>
              <label className="block text-sm mb-1">Title:</label>
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="typing your todo title here..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  onClick={handleAddTodo}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* แสดงรายการที่ save (เดิม) */}
        {savedTodos.length > 0 && (
          <div className="mt-6 p-4 border border-gray-300 rounded">
            <h3 className="font-semibold mb-2">Saved Todos:</h3>
            <ul className="list-disc pl-5">
              {savedTodos.map((t) => (
                <li key={t.id}>
                  {t.title} - <span className="font-semibold">{t.module}</span>
                  {t.note && ` (Note: ${t.note})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. เรียกใช้ Save All Modal (Tailwind Version) */}
      <SaveAllCompletedModal 
        show={showSaveAllModal} 
        handleClose={() => setShowSaveAllModal(false)} 
        handleSave={handleSaveAllCompleted}
      />
    </div>
  );
}